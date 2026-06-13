# C4 Advanced Patterns

Padrões para arquiteturas complexas: microservices, event-driven, deployment.
Adaptado de `softaworks/agent-toolkit`.

## Microservices

### Time único (containers)

Quando um time é dono de todos os serviços, modele cada um como `Container` dentro de um
`System_Boundary`:

```mermaid
C4Container
title E-commerce Platform - Single Team
Person(customer, "Customer", "Comprador")
System_Ext(payment, "Stripe", "Pagamentos")
System_Boundary(platform, "E-commerce Platform") {
  Container(gateway, "API Gateway", "Kong", "Routing, auth, rate limiting")
  Container(orderSvc, "Order Service", "Node.js", "Processa pedidos")
  ContainerDb(orderDb, "Order DB", "PostgreSQL", "Pedidos")
  Container(userSvc, "User Service", "Java", "Autenticação")
  ContainerDb(cache, "Cache", "Redis", "Sessões")
}
Rel(customer, gateway, "Requests", "HTTPS")
Rel(gateway, orderSvc, "Roteia", "HTTP")
Rel(orderSvc, orderDb, "Persiste", "SQL")
Rel(orderSvc, payment, "Cobra", "REST")
```

### Múltiplos times (sistemas)

Quando times separados são donos de serviços distintos, **promova cada serviço a software system**
no Context, e cada time desenha seu próprio Container diagram:

```mermaid
C4Context
title E-commerce - Multi-Team
Person(customer, "Customer", "Comprador")
Enterprise_Boundary(company, "Acme Corp") {
  System(orderSystem, "Order System", "Team Alpha")
  System(productSystem, "Product System", "Team Beta")
  System(userSystem, "User System", "Team Gamma")
}
System_Ext(payment, "Stripe", "Pagamentos")
Rel(customer, orderSystem, "Faz pedidos")
Rel(orderSystem, userSystem, "Autentica")
Rel(orderSystem, payment, "Processa pagamentos")
```

## Event-driven

### Tópicos individuais

Modele cada tópico/fila como container separado para revelar os fluxos reais:

```mermaid
C4Container
title Order Processing - Event-Driven
Container(orderSvc, "Order Service", "Java", "Cria pedidos")
Container(inventorySvc, "Inventory Service", "Go", "Estoque")
Container(paymentSvc, "Payment Service", "Node.js", "Pagamentos")
ContainerQueue(orderCreated, "order.created", "Kafka", "Novos pedidos")
ContainerQueue(paymentDone, "payment.completed", "Kafka", "Pagamentos")
Rel(orderSvc, orderCreated, "Publica", "Avro")
Rel(inventorySvc, orderCreated, "Consome", "Avro")
Rel(paymentSvc, paymentDone, "Publica", "Avro")
Rel(orderSvc, paymentDone, "Consome", "Avro")
```

### Fluxo de eventos (Dynamic)

```mermaid
C4Dynamic
title Order Processing Flow
Container(orderSvc, "Order Service", "Java")
Container(inventorySvc, "Inventory Service", "Go")
ContainerQueue(orderCreated, "order.created", "Kafka")
Rel(orderSvc, orderCreated, "1. Publica pedido", "Avro")
Rel(inventorySvc, orderCreated, "2. Consome pedido", "Avro")
```

### CQRS

```mermaid
C4Container
title CQRS Architecture
Person(user, "User", "Usuário")
Container_Boundary(app, "Application") {
  Container(commandApi, "Command API", "Java", "Escrita")
  Container(queryApi, "Query API", "Node.js", "Leitura")
  ContainerDb(writeDb, "Write DB", "PostgreSQL", "Fonte da verdade")
  ContainerDb(readDb, "Read DB", "Elasticsearch", "Otimizado para query")
  ContainerQueue(events, "Domain Events", "Kafka", "Mudanças de estado")
  Container(projector, "Projector", "Java", "Atualiza read model")
}
Rel(user, commandApi, "Commands", "HTTPS")
Rel(commandApi, writeDb, "Escreve", "JDBC")
Rel(commandApi, events, "Publica", "Avro")
Rel(projector, events, "Consome", "Avro")
Rel(projector, readDb, "Atualiza", "REST")
Rel(queryApi, readDb, "Consulta", "REST")
```

## Deployment

### Estrutura aninhada

Use `Deployment_Node` aninhados para representar a hierarquia real (cloud > VPC > subnet > cluster),
com containers nas folhas:

```mermaid
C4Deployment
title Production - Kubernetes
Deployment_Node(ingress, "Ingress Controller", "nginx") {
  Container(nginx, "Nginx", "nginx-ingress", "TLS, routing")
}
Deployment_Node(cluster, "Kubernetes Cluster", "EKS 1.28") {
  Deployment_Node(apiDeploy, "api-deployment", "3 replicas") {
    Container(api, "API Pod", "Node.js 20", "REST API")
  }
  Deployment_Node(pgStateful, "postgres-statefulset", "HA") {
    ContainerDb(pg, "PostgreSQL", "PostgreSQL 15", "Primary + Replica")
  }
}
Rel(nginx, api, "Roteia /api/*", "HTTP")
Rel(api, pg, "Consulta", "JDBC")
```

Padrões comuns: VPC com subnets públicas/privadas (ALB → ECS → RDS/ElastiCache), Kubernetes
(ingress → deployments → statefulsets) e multi-região active-active (global LB → regiões com
réplicas e bancos).
