# Architecture

## Architecture style perspective
```{mermaid}
flowchart LR
  api[restful api] --> controller --> service --> repository --> db
```

## Architecture dicisions perspective

### 1. Build

We have to build artifacts for FaaS and BaaS since current project contains too many `devDependencies` and redundancy modules.
[esbuild](https://esbuild.github.io/) is an extremely fast JavaScript bundler that can do what we desire:

- simple to use: `npx esbuild server/index.js --bundle --platform=node --target=node14.19.2 --outfile=build/server/index.js`
- build a standalone artifact: a huuuuge `index.js`

### 2. Documentation

> It doesn’t matter how good your product is, because if its documentation is not good enough, people will not use it. Even if they have to use it because they have no choice, without good documentation, they won’t use it effectively or the way you’d like them to.

That's the reason why we need an awesome document tool and follow document quadrants pattern.

[sphinx](https://www.sphinx-doc.org/en/master/) is the best document tool as far as I know. It was originally created for the Python documentation, and it has excellent facilities for the documentation of software projects in a range of languages.

### 3. [Api test](apitest.md)

### 4. [Spike aws lambda](spike-aws-lambda.rst)

### 5. Authentication trade-off

* stateless
* CAP
* CORS
* security

### 6. Authorization: OAuth2.0

## Design principle perspective

* SOLID

## Architecture characteristics perspective

- testability: easy to test
- installability: it can be deployed in server/serverless way
- flexibility:
  - can be intergrated as a component
  - can be a pod in kubenetes cluster
  - can be deployed as a standalne service
  - can be a component of micro service system
- configurability
