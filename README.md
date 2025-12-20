# God-Level E-Commerce Microservices Platform

A comprehensive, production-ready E-commerce microservices platform built with **Spring Boot 3**, **Angular 19**, **Kubernetes (EKS)**, and **Terraform**. Designed for high scalability, resilience, and "Rock Solid" reliability.

---

## 🚀 Features
*   **15 Microservices**: User, Product, Order, Inventory, Payment, Shipping, Notification, Search, Promotion, Rating, Tax, Favourite, API Gateway, Discovery, Config Server.
*   **Frontend**: Angular 19 Admin Dashboard with signals, standalone components, and Tailwind CSS.
*   **Infrastructure**: Fully scripted AWS EKS cluster with Terraform.
*   **Orchestration**: Kubernetes with Helm (Umbrella Chart) for stateful workloads (Redis, Kafka, MongoDB, OpenSearch).
*   **CI/CD**: GitHub Actions for automated testing and ECR push.
*   **Observability**: Prometheus & Grafana for metrics, EFK Stack (Fluentd, OpenSearch, Kibana) for logs.
*   **GitOps**: ArgoCD for continuous delivery.

---

## 🛠 Prerequisites

Ensure you have the following CLI tools installed:
1.  **Docker & Docker Desktop**: Container runtime.
2.  **AWS CLI**: Configured with credentials (`aws configure`).
3.  **Terraform (v1.6+)**: Infrastructure provisioning.
4.  **kubectl**: Kubernetes command-line tool.
5.  **Helm**: Package manager for Kubernetes.
6.  **Node.js 18+ & npm**: For Angular frontend.
7.  **Java 17 (JDK)**: For Spring Boot services.

---

## 🏃 Local Development (Docker)

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/harshaljadhav-git/E-commerce-microservices-kubernetes.git
    cd E-commerce-microservices-kubernetes
    ```

2.  **Build Microservices**:
    ```bash
    # Example for one service (repeat for all or use script)
    cd product-service
    mvn clean package -DskipTests
    docker build -t product-service:latest .
    ```

3.  **Run Frontend**:
    The frontend is configured to point to `localhost:8080` (API Gateway) by default in dev mode.
    ```bash
    cd angular-frontend
    npm install
    npm start
    # Access at http://localhost:4200
    ```

---

## ☁️ Cloud Deployment (AWS EKS)

### Step 1: Provision Infrastructure (Terraform)
This sets up the VPC, EKS Cluster (v1.34), RDS MySQL, and S3.

1.  Navigate to Terraform directory:
    ```bash
    cd terraform
    ```
2.  Initialize and Apply:
    ```bash
    terraform init
    terraform apply -var="db_master_password=YOUR_SECURE_PASSWORD" -var="db_master_username=admin"
    ```
3.  Configure `kubectl` access:
    ```bash
    aws eks update-kubeconfig --region us-east-1 --name ecommerce-cluster
    ```

### Step 2: Deploy Infrastructure Services (Helm)
We use a self-hosted "Economy Mode" Helm chart for Redis, Kafka, MongoDB, and OpenSearch.

1.  **Install ArgoCD**:
    ```bash
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
    ```
2.  **Apply Infrastructure App**:
    ```bash
    kubectl apply -f k8s/argocd/infrastructure-app.yaml
    ```
    *Wait for Redis, Kafka, Mongo, and OpenSearch pods to be `Running` in `ecommerce` namespace.*

### Step 3: Deploy Microservices & Ingress
1.  **Apply Application App**:
    ```bash
    kubectl apply -f k8s/argocd/application.yaml
    ```
    This syncs all 15 microservices, Ingress rules, ConfigMaps, and Secrets.

---

## 🔍 Verification & Access

### 1. Check Pod Status
```bash
kubectl get pods -n ecommerce
# All pods should be 1/1 Running
```

### 2. Access Frontend
*   Get the LoadBalancer DNS from Ingress:
    ```bash
    kubectl get ingress -n ecommerce
    ```
*   Open the URL in your browser. The frontend automatically switches to `/api` relative routing in production.

### 3. Monitoring (Grafana)
*   **Port Forward**:
    ```bash
    kubectl port-forward svc/grafana 3000:3000 -n ecommerce
    ```
*   Access at `http://localhost:3000` (User/Pass: `admin`/`admin`).

### 4. Logging (Kibana)
*   **Port Forward**:
    ```bash
    kubectl port-forward svc/kibana 5601:5601 -n ecommerce
    ```
*   Access at `http://localhost:5601`.

---

## 🛡️ "Rock Solid" Architecture
*   **Auto-Scaling (HPA)**: Critical services (Gateway, Frontend, Product, Order) auto-scale based on CPU/Memory.
*   **Zero Hardcoding**: All configuration is injected via Kubernetes ConfigMaps and Secrets.
*   **Environment Aware**: Angular frontend detects whether it's running locally or in K8s to adjust API routing.

---

## 🧹 Cleanup
To destroy all resources and avoid AWS costs:
```bash
cd terraform
terraform destroy
```
