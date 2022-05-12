# Architecture

## Architecture style perspective
```mermaid
flowchart LR
  api[restful api] --> controller --> service --> repository --> db
```

## Architecture dicisions perspective

### 1. Api design

```mermaid
flowchart LR
  subgraph tinyoauth

    subgraph gateway[api gateway]
      post_protected_api[post /protected/resource]
      post_login_api[post /login]
      post_register_api[post /register]
      post_authorize_api[post /authrize]
      post_token_api[post /token]
    end

    subgraph auth
      authenticate
      authorize
      issue_token[issue token]
    end

    post_protected_api --> authenticate
    authenticate -- failure --> 401

    post_authorize_api --> authorize
    post_token_api --> issue_token

  end

  subgraph service
    service_api[post /protected/resource]
  end

  authenticate -- success --> service
  user_agent((user agent)) --> post_protected_api
```

### 2. Infrastructure

- serverless mode

```mermaid
flowchart LR
  apigateway[aws apigateway] --> lambda[aws lambda] --> db[aws dynamodb]
```

- micro service mode

```mermaid
flowchart LR
  gateway[nginx as gateway] --> app[tinyoauth server] --> db[aws dynamo db]
```

## Design principle perspective

WIP...

## Architecture characteristics perspective

WIP...
