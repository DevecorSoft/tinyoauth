# Tinyoauth

[![ci/cd](https://github.com/DevecorSoft/tinyoauth/actions/workflows/ci.yml/badge.svg)](https://github.com/DevecorSoft/tinyoauth/actions/workflows/ci.yml)  [![github pages](https://github.com/DevecorSoft/tinyoauth/actions/workflows/pages.yml/badge.svg)](https://github.com/DevecorSoft/tinyoauth/actions/workflows/pages.yml)

a hostable api gateway that protects your api with oauth2.0

## Documentation

[Here](https://devecorsoft.github.io/tinyoauth/)

## Development guide

### Requirements

- node-16-lts
- docker

### Install

- npm install

### Test

- npm run test:unit
- npm run test:api

### Trunk-based development

#### Just push your commits!

There is no branch, no pull-request, you are allowed to make any changes and push it:

1. git pull --rebase
2. git add -p
3. git commit -m "xxx"
4. git push

### Build docs

```
cd docs
python -m pip install -r requirements.txt
make help
```

## Architecture

### Serverless

```mermaid
flowchart LR
  api[restful api] --> controller --> service --> repository --> db
```

## Design

### Api

```mermaid
flowchart LR
  subgraph tinyoauth

    subgraph gateway[api gateway]
      post_image_api[post /image]
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

    subgraph db
      dynamodb
    end

    post_image_api --> authenticate
    authenticate -- failure --> 401

    post_authorize_api --> authorize
    post_token_api --> issue_token

  end

  subgraph service
    service_api[post /image]
  end

  authenticate -- success --> service
  user_agent((user agent)) --> post_image_api
```

