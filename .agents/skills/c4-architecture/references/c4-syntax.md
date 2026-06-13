# C4 Mermaid Syntax Reference

Referência de sintaxe para diagramas C4 em Mermaid (compatível com a sintaxe C4 do PlantUML).
Adaptado de `softaworks/agent-toolkit`.

## Tipos de diagrama

Cada diagrama começa com a declaração de tipo:

| Tipo | Declaração | Mostra |
|---|---|---|
| System Context | `C4Context` | Sistema no contexto de usuários e sistemas externos |
| Container | `C4Container` | Blocos técnicos de alto nível |
| Component | `C4Component` | Componentes internos de um container |
| Dynamic | `C4Dynamic` | Fluxos de request com sequência numerada |
| Deployment | `C4Deployment` | Infraestrutura e nós de deploy |

## Elementos por nível

### Pessoas e sistemas (Context)

```
Person(alias, "Label", "Descrição")
Person_Ext(alias, "Label", "Descrição")        # pessoa externa
System(alias, "Label", "Descrição")
System_Ext(alias, "Label", "Descrição")        # sistema externo
SystemDb(alias, "Label", "Descrição")           # sistema de banco
SystemQueue(alias, "Label", "Descrição")        # sistema de fila
```

### Containers

```
Container(alias, "Label", "Tecnologia", "Descrição")
Container_Ext(alias, "Label", "Tecnologia", "Descrição")
ContainerDb(alias, "Label", "Tecnologia", "Descrição")
ContainerQueue(alias, "Label", "Tecnologia", "Descrição")
```

### Components

```
Component(alias, "Label", "Tecnologia", "Descrição")
Component_Ext(alias, "Label", "Tecnologia", "Descrição")
ComponentDb(alias, "Label", "Tecnologia", "Descrição")
ComponentQueue(alias, "Label", "Tecnologia", "Descrição")
```

### Deployment nodes (aninháveis)

```
Deployment_Node(alias, "Label", "Tipo", "Descrição") { ... }
Node(alias, "Label", "Tipo", "Descrição") { ... }   # atalho
```

```mermaid
C4Deployment
title Nested Deployment Nodes
Deployment_Node(dc, "Data Center", "Physical") {
  Deployment_Node(server, "Web Server", "Ubuntu 22.04") {
    Container(app, "Application", "Node.js", "Serves API")
  }
}
```

## Boundaries

```
Enterprise_Boundary(alias, "Label") { ... }   # sistemas e pessoas
System_Boundary(alias, "Label") { ... }        # containers
Container_Boundary(alias, "Label") { ... }     # components
Boundary(alias, "Label", "tipo") { ... }       # genérico
```

## Relacionamentos

```
Rel(from, to, "Label")
Rel(from, to, "Label", "Tecnologia")
BiRel(from, to, "Label")                  # bidirecional (evitar)
Rel_U / Rel_D / Rel_L / Rel_R(from, to, "Label")   # dicas de direção
```

Em diagramas Dynamic, a sequência é determinada pela ordem das declarações; numere no rótulo
(`"1. Submit"`, `"2. Validate"`).

## Estilo e layout

```
UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
UpdateElementStyle(alias, $bgColor="grey", $fontColor="red", $borderColor="red")
UpdateRelStyle(from, to, $textColor="blue", $lineColor="blue", $offsetX="5", $offsetY="-10")
```

- `$c4ShapeInRow` (default 4) e `$c4BoundaryInRow` (default 2) reduzem aglomeração.
- `$offsetX` / `$offsetY` corrigem rótulos de relação sobrepostos.

## Exemplos completos

### Context

```mermaid
C4Context
title System Context - Internet Banking
Enterprise_Boundary(b0, "Bank") {
  Person(customer, "Banking Customer", "Cliente com contas")
  System(banking, "Internet Banking System", "Ver contas e pagar")
  SystemDb_Ext(mainframe, "Mainframe", "Dados core")
  System_Ext(email, "E-mail System", "Microsoft Exchange")
}
Rel(customer, banking, "Usa")
Rel(banking, mainframe, "Lê/escreve", "JDBC")
Rel(banking, email, "Envia emails", "SMTP")
```

### Container

```mermaid
C4Container
title Container Diagram - Internet Banking
Person(customer, "Customer", "Cliente do banco")
System_Ext(email, "E-Mail System", "Microsoft Exchange")
Container_Boundary(c1, "Internet Banking") {
  Container(spa, "Single-Page App", "JavaScript, Angular", "UI bancária")
  Container(api, "API Application", "Java, Spring MVC", "API bancária")
  ContainerDb(db, "Database", "SQL Server", "Dados de usuário")
}
Rel(customer, spa, "Usa", "HTTPS")
Rel(spa, api, "Usa", "JSON/HTTPS")
Rel(api, db, "Lê/escreve", "JDBC")
Rel(api, email, "Envia emails", "SMTP")
```

### Component

```mermaid
C4Component
title Component Diagram - API Application
ContainerDb(db, "Database", "SQL Server", "Dados de usuário")
Container_Boundary(api, "API Application") {
  Component(signIn, "Sign In Controller", "Spring MVC", "Autenticação")
  Component(security, "Security Component", "Spring Bean", "Lógica de auth")
  Component(repo, "User Repository", "JPA", "Acesso a dados")
}
Rel(signIn, security, "Usa")
Rel(security, repo, "Usa")
Rel(repo, db, "Lê/escreve", "JDBC")
```

### Dynamic

```mermaid
C4Dynamic
title Dynamic Diagram - Sign In Flow
ContainerDb(db, "Database", "SQL Server", "Credenciais")
Container(spa, "Single-Page App", "Angular", "UI")
Container_Boundary(api, "API Application") {
  Component(signIn, "Sign In Controller", "Spring MVC", "Endpoint de auth")
  Component(security, "Security Component", "Spring Bean", "Valida credenciais")
}
Rel(spa, signIn, "1. Envia credenciais", "JSON/HTTPS")
Rel(signIn, security, "2. Valida")
Rel(security, db, "3. Consulta usuário", "JDBC")
```

### Deployment

```mermaid
C4Deployment
title Deployment Diagram - Production
Deployment_Node(browser, "Customer Browser", "Chrome/Firefox") {
  Container(spa, "SPA", "Angular", "Web banking")
}
Deployment_Node(dc, "Data Center", "AWS") {
  Deployment_Node(web, "Web Tier", "EC2") {
    Container(api, "API", "Spring Boot", "Banking API")
  }
  Deployment_Node(data, "Data Tier", "RDS") {
    ContainerDb(db, "Database", "PostgreSQL", "Banking data")
  }
}
Rel(spa, api, "API calls", "HTTPS")
Rel(api, db, "Lê/escreve", "JDBC")
```

## Limitações do Mermaid

- O índice de `RelIndex` é ignorado; a ordem das linhas define a sequência em Dynamic.
- Layouts densos exigem `UpdateLayoutConfig` e divisão em múltiplos diagramas.
