# Infrastructure

## serverless mode

```{mermaid}
flowchart LR
  apigateway[aws apigateway] --> lambda[aws lambda] --> db[aws dynamodb]
```

```{note}
costless
```

## server mode

```{mermaid}
flowchart LR
  gateway[nginx as gateway] --> app[tinyoauth server] --> db[aws dynamo db]
```

```{note}
low-cost
```