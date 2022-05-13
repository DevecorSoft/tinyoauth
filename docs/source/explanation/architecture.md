# Architecture

## Architecture style perspective
```{mermaid}
flowchart LR
  api[restful api] --> controller --> service --> repository --> db
```

## Architecture dicisions perspective

### 1. Api design

```{mermaid}
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

```{mermaid}
flowchart LR
  apigateway[aws apigateway] --> lambda[aws lambda] --> db[aws dynamodb]
```

```{note}
costless
```

- micro service mode

```{mermaid}
flowchart LR
  gateway[nginx as gateway] --> app[tinyoauth server] --> db[aws dynamo db]
```

```{note}
low-cost
```

### 3. Build

We have to build artifacts for FaaS and BaaS since current project contains too many `devDependencies` and redundancy modules.
[esbuild](https://esbuild.github.io/) is an extremely fast JavaScript bundler that can do what we desire:

- simple to use: `npx esbuild server/index.js --bundle --platform=node --target=node14.19.2 --outfile=build/server/index.js`
- build a standalone artifact: a huuuuge `index.js`

### 4. Document tool

> It doesn’t matter how good your product is, because if its documentation is not good enough, people will not use it. Even if they have to use it because they have no choice, without good documentation, they won’t use it effectively or the way you’d like them to.

That the reason we need an awesome document tool and follow document quadrants pattern.

[sphinx](https://www.sphinx-doc.org/en/master/) is the best document tool as far as I know. It was originally created for the Python documentation, and it has excellent facilities for the documentation of software projects in a range of languages.

## Design principle perspective

WIP...

## Architecture characteristics perspective

- testability: easy to test
- hostability: it can be deployed in server/serverless way
- flexibility:
  - can be intergrated as a component
  - can be a pod in kubenetes cluster
  - can be deployed as a standalne service
  - can be a component of micro service system
