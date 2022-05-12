# Api test

## What's api test?

I would say that api test is integration test but just foucs on single api call.

In api test:

- we starts up real db via docker
- we won't mock any method/component
- but we will mock a http call to 3rdparty system

## child_process VS testcontainer

In java world, we have a fantastic tool called `Testcontainer`, which is convenient to run a db via docker in a programmable way. and it also have a nodejs lib to support tests. However, if case we don't have `docker desktop` in Macos, testcontainer-node won't work this period.

We found that to start up a docker container by `child_process` works well:

```javascript
const container_hash = execSync("docker run -d -p 3330:8000 amazon/dynamodb-local");
execSync(`docker stop ${container_hash} \\\ndocker rm ${container_hash}`);
```

You may want to read [hooks.js](https://github.com/DevecorSoft/tinyoauth/blob/main/test/hooks.js) and understand how it works with api test
