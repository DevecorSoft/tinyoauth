# Development guide

## Requirements

- nodejs
- docker

## Install

- npm install

## Test

- npm run test:unit
- npm run test:api

## Trunk-based development

### Just push your commits!

There is no branch, no pull-request, you are allowed to make any changes and push it:

1. git pull --rebase
2. git add -p
3. git commit -m "xxx"
4. git push

## Build docs

```shell
cd docs
python -m pip install -r requirements.txt
make help
```

## Board

[github project](https://github.com/DevecorSoft/tinyoauth/projects/1)

## Build artifacts and deploy

### serverless mode

- please run `npm run build:serverless:aws` in your terminal
- then upload build/serverless/tinyoauth.zip to aws lambda

### server mode

- please run `npm run build:server` in your terminal
- then you can run your server with `node build/server/index.js` and it will be avaliable on `http://localhost:3333`
