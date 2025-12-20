# AWS Services Requirements for E-Commerce Microservices

This document outlines the Amazon Web Services (AWS) components required to deploy the "God-Level" E-Commerce Microservices platform in a production-ready, enterprise-grade environment.

## 1. Compute & Containers
*   **Amazon Elastic Kubernetes Service (EKS)**: The core orchestration platform for managing the 15+ microservices and frontend containers.
    *   **Control Plane**: Managed Kubernetes master nodes.
    *   **Managed Node Groups**: EC2 instances (workers) managed by EKS to run pods.
*   **Amazon EC2**: Underlying virtual machines for the EKS worker nodes.
    *   *Recommendation*: use a mix of On-Demand (critical) and Spot Instances (stateless/batch) for cost optimization.
*   **Amazon Elastic Container Registry (ECR)**: Secure, private Docker registry to store the container images for all microservices and the frontend.

## 2. Networking & Content Delivery
*   **Amazon VPC (Virtual Private Cloud)**: Isolated network environment.
    *   **Public Subnets**: For Load Balancers and NAT Gateways.
    *   **Private Subnets**: For EKS Nodes and internal services (Application Layer).
    *   **Database Subnets**: Isolated subnets for data persistence layers.
*   **Internet Gateway (IGW)**: Allows communication between the VPC and the internet.
*   **NAT Gateway**: Allows instances in private subnets to connect to the internet (e.g., for pulling images or updates) without being exposed.
*   **Elastic Load Balancing (ELB)**:
    *   **Application Load Balancer (ALB)**: Managed by the AWS Load Balancer Controller (Ingress) to route HTTP/HTTPS traffic to the frontend and API Gateway.
    *   **Network Load Balancer (NLB)**: (Optional) For high-throughput internal TCP communication or specialized ingress needs.
*   **Amazon Route 53**: Scalable DNS web service to route end-users to the application (e.g., `ecommerce.example.com`).

## 3. Databases & Storage
*   **Amazon RDS for Aurora (MySQL)**: High-performance managed relational database for core transactional services.
    *   *Note*: Essential for durability and ease of management, even in dev.
*   **Amazon DocumentDB (Managed or Self-Hosted)**:
    *   *Decision*: Use **Self-Hosted MongoDB** in Kubernetes for development cost savings.
*   **Redis (Self-Hosted in K8s)**:
    *   *Replaces*: Amazon ElastiCache.
    *   *Deployment*: Kubernetes StatefulSet/Deployment with Docker image `redis:alpine`.
*   **Amazon S3 (Simple Storage Service)**: Object storage for assets and logs.
*   **Amazon EBS (Elastic Block Store)**: Persistent storage for the self-hosted databases (MySQL, Mongo, Redis, Kafka, Elastic).

## 4. Messaging & Streaming
*   **Apache Kafka (Self-Hosted in K8s)**:
    *   *Replaces*: Amazon MSK.
    *   *Deployment*: Kubernetes StatefulSet using Bitnami Kafka or Strimzi Operator.

## 5. Search & Analytics
*   **OpenSearch/Elasticsearch (Self-Hosted in K8s)**:
    *   *Replaces*: Amazon OpenSearch Service.
    *   *Deployment*: Kubernetes StatefulSet (already partially set up for Logging, can be shared or expanded).

## 6. Security, Identity & Compliance
*   **AWS IAM (Identity and Access Management)**:
    *   **Roles & Policies**: For granting EKS nodes access to ECR and S3.
*   **KMS**: *Excluded* for cost savings (standard S3 encryption is sufficient).
*   **AWS Secrets Manager**: Optional. basic Kubernetes Secrets will be used for cost savings.

## 7. Management & Observability
*   **Amazon CloudWatch**:
    *   **Logs**: Minimal usage. Primary logging via **Self-Hosted EFK Stack**.
*   **Prometheus & Grafana (Self-Hosted)**: Already running in the cluster.

## Summary Checklist (Economy/Dev Mode)
| Service | Purpose | Deployment Type |
| :--- | :--- | :--- |
| **EKS** | Container Orchestration | AWS Managed |
| **ECR** | Image Registry | AWS Managed |
| **VPC** | Networking | AWS Managed |
| **RDS** | Relational DB | AWS Managed (or Self-Hosted for minimal cost) |
| **MongoDB** | NoSQL DB | **Container** |
| **Kafka** | Event Bus | **Container** |
| **OpenSearch** | Search Engine | **Container** |
| **Redis** | Caching | **Container** |
| **ALB** | Ingress Controller | AWS Managed |
