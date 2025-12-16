# 🛒 E-commerce Microservices Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-17+-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Enabled-blue.svg)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)

A comprehensive microservices-based e-commerce platform built with Spring Boot, deployed on Kubernetes, featuring service discovery, API gateway, and distributed tracing.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Microservices](#microservices)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Monitoring & Tracing](#monitoring--tracing)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project demonstrates a production-ready e-commerce platform built using microservices architecture. Each service is independently deployable, scalable, and maintainable, following cloud-native principles and best practices.

### Key Features

- 🔄 **Microservices Architecture**: Modular, independently scalable services
- 🚀 **Kubernetes Orchestration**: Container orchestration for production deployment
- 🔐 **Secure API Gateway**: Centralized authentication and routing
- 📊 **Service Discovery**: Dynamic service registration with Eureka
- 📈 **Distributed Tracing**: Request tracking across services with Zipkin
- 🔔 **Event-Driven**: Asynchronous communication using messaging
- 💾 **Multiple Databases**: Polyglot persistence for optimal data storage
- 🌐 **Angular Frontend**: Modern, responsive user interface

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway (8080)                       │
│              (Authentication & Routing Layer)                │
└─────────────────────────────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│   Discovery    │  │   User Service  │  │  Product Svc   │
│   Service      │  │    (Auth)       │  │                │
│   (Eureka)     │  └─────────────────┘  └────────────────┘
└────────────────┘
        │
        ├────────────────────┬────────────────────┬────────────────
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│  Order Service │  │ Payment Service │  │ Inventory Svc  │
└────────────────┘  └─────────────────┘  └────────────────┘
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│ Shipping Svc   │  │ Notification    │  │  Rating Svc    │
└────────────────┘  │    Service      │  └────────────────┘
                    └─────────────────┘
┌─────────────────────────────────────────────────────────────┐
│              Zipkin Distributed Tracing (9411)              │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Microservices

| Service | Port | Description | Key Features |
|---------|------|-------------|--------------|
| **API Gateway** | 8080 | Entry point for all client requests | Routing, Load balancing, Authentication |
| **Discovery Service** | 8761 | Service registry (Eureka) | Service discovery, Health monitoring |
| **User Service** | 8081 | User management & authentication | JWT tokens, User profiles, RBAC |
| **Product Service** | 8082 | Product catalog management | CRUD operations, Product search |
| **Order Service** | 8083 | Order processing | Order lifecycle, Order tracking |
| **Payment Service** | 8084 | Payment processing | Payment gateway integration |
| **Inventory Service** | 8085 | Stock management | Stock levels, Inventory tracking |
| **Shipping Service** | 8086 | Shipping & delivery | Shipping calculations, Tracking |
| **Notification Service** | 8087 | Email/SMS notifications | Event-driven notifications |
| **Rating Service** | 8088 | Product reviews & ratings | Reviews, Ratings aggregation |
| **Favourite Service** | 8089 | User wishlists | Wishlist management |
| **Promotion Service** | 8090 | Deals & discounts | Coupon codes, Promotions |
| **Tax Service** | 8091 | Tax calculations | Regional tax rules |
| **Search Service** | 8092 | Advanced product search | Full-text search, Filters |

## 💻 Technology Stack

### Backend
- **Java 17+** - Programming language
- **Spring Boot 3.x** - Application framework
- **Spring Cloud** - Microservices framework
  - Spring Cloud Gateway
  - Spring Cloud Netflix (Eureka)
  - Spring Cloud Config
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Data persistence
- **Hibernate** - ORM framework

### Frontend
- **Angular** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **Bootstrap** - UI framework

### Database & Messaging
- **PostgreSQL** - Primary relational database
- **MongoDB** - NoSQL database (optional services)
- **Redis** - Caching layer
- **Apache Kafka / RabbitMQ** - Message broker

### DevOps & Infrastructure
- **Docker** - Containerization
- **Kubernetes** - Container orchestration
- **Docker Compose** - Local development
- **GitHub Actions** - CI/CD pipeline
- **Zipkin** - Distributed tracing
- **Prometheus** - Metrics collection
- **Grafana** - Monitoring dashboards

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17+**
- **Maven 3.8+**
- **Docker 20.10+**
- **Docker Compose 2.0+**
- **Kubernetes Cluster** (Minikube, Docker Desktop, or Cloud Provider)
- **kubectl** - Kubernetes CLI
- **Node.js 16+** and **npm** (for Angular frontend)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/harshaljadhav-git/E-commerce-microservices-kubernetes.git
cd E-commerce-microservices-kubernetes
```

### 2. Setup Environment

Run the setup script to configure your environment:

```bash
chmod +x setup_environment.sh
./setup_environment.sh
```

### 3. Build All Services

```bash
# Build all microservices
mvn clean install

# Or build specific service
cd user-service
mvn clean install
```

### 4. Run with Docker Compose (Local Development)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### 5. Run on Kubernetes

```bash
# Apply Kubernetes configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services

# Access services
kubectl port-forward service/api-gateway 8080:8080
```

### 6. Start Angular Frontend

```bash
cd angular-frontend
npm install
ng serve

# Access at http://localhost:4200
```

## 🌐 API Documentation

### Access Swagger UI

Once the services are running, access the API documentation:

- **API Gateway**: http://localhost:8080/swagger-ui.html
- **User Service**: http://localhost:8081/swagger-ui.html
- **Product Service**: http://localhost:8082/swagger-ui.html

### Sample API Endpoints

#### Authentication
```bash
# Register new user
POST /api/auth/register
{
  "username": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

# Login
POST /api/auth/login
{
  "username": "user@example.com",
  "password": "password123"
}
```

#### Products
```bash
# Get all products
GET /api/products

# Get product by ID
GET /api/products/{id}

# Create product (Admin only)
POST /api/products
```

#### Orders
```bash
# Create order
POST /api/orders
{
  "items": [...],
  "shippingAddress": {...}
}

# Get user orders
GET /api/orders/user/{userId}
```

### Using Pre-request Script

For Postman, use the included `Pre-request-Script.js` to automatically handle authentication tokens.

## 📊 Monitoring & Tracing

### Zipkin Distributed Tracing

Access Zipkin dashboard at: http://localhost:9411

Zipkin captures and visualizes the flow of requests across microservices, helping you:
- Identify performance bottlenecks
- Debug distributed transactions
- Analyze service dependencies

### Eureka Dashboard

Access Eureka dashboard at: http://localhost:8761

Monitor all registered microservices and their health status.

### Metrics & Monitoring

```bash
# Access Prometheus metrics
curl http://localhost:8080/actuator/prometheus

# Health check
curl http://localhost:8080/actuator/health
```

## 🔐 Security

### Authentication Flow

1. User logs in via `/api/auth/login`
2. Server validates credentials
3. JWT token is generated and returned
4. Client includes token in `Authorization: Bearer <token>` header
5. API Gateway validates token for all requests
6. Request is forwarded to appropriate microservice

### Security Features

- **JWT-based Authentication**: Stateless authentication
- **Role-Based Access Control (RBAC)**: Admin, User roles
- **API Gateway Security**: Centralized authentication
- **HTTPS/TLS**: Encrypted communication
- **Input Validation**: Prevent injection attacks
- **Rate Limiting**: Prevent abuse

## 🐳 Docker Configuration

### Building Docker Images

```bash
# Build specific service
docker build -t ecommerce/user-service:latest ./user-service

# Build all services
docker-compose build
```

### Docker Registry

```bash
# Tag images for registry
docker tag ecommerce/user-service:latest your-registry/user-service:latest

# Push to registry
docker push your-registry/user-service:latest
```

## ☸️ Kubernetes Deployment

### Deploy to Kubernetes

```bash
# Create namespace
kubectl create namespace ecommerce

# Apply configurations
kubectl apply -f k8s/configmaps/ -n ecommerce
kubectl apply -f k8s/secrets/ -n ecommerce
kubectl apply -f k8s/deployments/ -n ecommerce
kubectl apply -f k8s/services/ -n ecommerce

# Check deployment
kubectl get all -n ecommerce
```

### Scaling Services

```bash
# Scale specific service
kubectl scale deployment user-service --replicas=3 -n ecommerce

# Auto-scaling
kubectl autoscale deployment user-service --min=2 --max=5 --cpu-percent=80 -n ecommerce
```

## 🔄 CI/CD Pipeline

GitHub Actions workflows are configured in `.github/workflows/`:

- **Build & Test**: Automated testing on push
- **Docker Build**: Build and push Docker images
- **Deploy to Kubernetes**: Automated deployment

## 🧪 Testing

```bash
# Run unit tests
mvn test

# Run integration tests
mvn verify

# Run specific service tests
cd user-service
mvn test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Follow Java coding conventions
- Write meaningful commit messages
- Add unit tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Harshal Jadhav** - [@harshaljadhav-git](https://github.com/harshaljadhav-git)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Netflix OSS for microservices patterns
- Kubernetes community for orchestration tools
- All contributors who have helped this project

## 📞 Support

For support and questions:
- Open an issue in the [GitHub repository](https://github.com/harshaljadhav-git/E-commerce-microservices-kubernetes/issues)
- Check existing documentation in the `/doc` folder

## 🗺️ Roadmap

- [ ] Add GraphQL API support
- [ ] Implement Saga pattern for distributed transactions
- [ ] Add Elasticsearch for advanced search
- [ ] Implement API versioning
- [ ] Add comprehensive integration tests
- [ ] Set up Grafana dashboards
- [ ] Implement service mesh (Istio)
- [ ] Add multi-region deployment support

---

⭐ If you find this project useful, please consider giving it a star!

Made with ❤️ by [Harshal Jadhav](https://github.com/harshaljadhav-git)
