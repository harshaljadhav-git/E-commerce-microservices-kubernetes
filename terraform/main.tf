# terraform/main.tf
terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = "~> 1.14"
    }
  }
  
  # backend "s3" {
  #   bucket         = "ecommerce-terraform-state"
  #   key            = "prod/terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "terraform-state-lock"
  #   # kms_key_id     = "arn:aws:kms:us-east-1:ACCOUNT_ID:key/KEY_ID" # Uncomment and replace in real use
  # }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = "ecommerce-microservices"
      ManagedBy   = "Terraform"
      Owner       = "DevOps Team"
      CostCenter  = "Engineering"
    }
  }
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

# Local variables
locals {
  cluster_name = "ecommerce-${var.environment}-eks"
  common_tags = {
    Environment = var.environment
    Project     = "ecommerce-microservices"
    ManagedBy   = "Terraform"
  }
}

# VPC Module
module "vpc" {
  source = "./modules/vpc"
  
  environment        = var.environment
  vpc_cidr           = var.vpc_cidr
  availability_zones = slice(data.aws_availability_zones.available.names, 0, 3)
  
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  database_subnet_cidrs = var.database_subnet_cidrs
  
  enable_nat_gateway   = true
  single_nat_gateway   = var.environment == "dev" ? true : false
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = local.common_tags
}

# EKS Module
module "eks" {
  source = "./modules/eks"
  
  cluster_name    = local.cluster_name
  cluster_version = var.eks_cluster_version
  
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnet_ids
  
  node_groups = {
    general = {
      desired_size = 3
      min_size     = 3
      max_size     = 10
      instance_types = ["t3.large"]
      capacity_type  = "ON_DEMAND"
      labels = { role = "general" }
      taints = []
    }
    spot = {
      desired_size = 2
      min_size     = 0
      max_size     = 10
      instance_types = ["t3.large", "t3a.large"]
      capacity_type  = "SPOT"
      labels = { role = "spot" }
      taints = [{ key = "spot", value = "true", effect = "NO_SCHEDULE" }]
    }
  }
  
  enable_irsa = true
  tags = local.common_tags
  depends_on = [module.vpc]
}

# RDS Module
# RDS Module
# module "rds" {
#   source = "./modules/rds"
#   
#   identifier = "ecommerce-${var.environment}-db"
#   
#   engine               = "aurora-mysql"
#   engine_version       = "8.0.mysql_aurora.3.04.0"
#   instance_class       = var.environment == "prod" ? "db.r6g.large" : "db.t3.medium"
#   allocated_storage    = 100
#   storage_encrypted    = true
#   
#   database_name  = "ecommerce"
#   master_username = var.db_master_username
#   master_password = var.db_master_password
#   
#   vpc_id             = module.vpc.vpc_id
#   subnet_ids         = module.vpc.database_subnet_ids
#   allowed_cidr_blocks = module.vpc.private_subnet_cidrs
#   
#   backup_retention_period = var.environment == "prod" ? 30 : 7
#   preferred_backup_window = "03:00-04:00"
#   
#   multi_az               = var.environment == "prod" ? true : false
#   deletion_protection    = var.environment == "prod" ? true : false
#   skip_final_snapshot    = var.environment != "prod"
#   
#   performance_insights_enabled = true
#   
#   tags = local.common_tags
#   
#   depends_on = [module.vpc]
# }

# DocumentDB Module -> Commented out until implementation to avoid init errors
# module "documentdb" { ... }

# ... (Other modules to be enabled as they are implemented)
