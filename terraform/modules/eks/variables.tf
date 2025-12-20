# terraform/modules/eks/variables.tf
variable "cluster_name" {
  type = string
}

variable "cluster_version" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "node_groups" {
  type = map(object({
    desired_size = number
    min_size     = number
    max_size     = number
    instance_types = list(string)
    capacity_type  = string
    labels         = map(string)
    taints         = list(object({
      key    = string
      value  = string
      effect = string
    }))
  }))
}

variable "enable_irsa" {
  type = bool
  default = true
}

variable "tags" {
  type = map(string)
  default = {}
}
