# Api design

```mermaid
flowchart LR
  subgraph tinyoauth

    subgraph gateway[api gateway]
      request_protected_api[request /protected/resource]
      post_login_api[post /login]
      post_register_api[post /register]
      post_client_api[post /client]
      post_authorize_api[post /authorize]
      post_token_api[post /token]
    end

    subgraph auth
      authenticate
      authorize
      issue_token[issue token]
    end

    request_protected_api --> authenticate
    authenticate -- failure --> 401

    post_authorize_api --> authorize
    post_token_api --> issue_token

  end

  subgraph service
    service_api[post /protected/resource]
  end

  authenticate -- success --> service
  user_agent((user agent)) --> request_protected_api
```

## post /login

- [x] mark user as online
- [x] update operation time
- [ ] issue jwt token

* Request
  * General:
    * Request Method: `POST`
  * Headers:
    * Content-Type: `application/json`
  * Payload:
    ```json
    {
        "username": "user",
        "password": "xxxx"
    }
    ```
* Response
  * General：
    * Status Code: `200`
  * Payload:
    * success:
        ```json
        {
            "result": "succeeded",
            "token": "xxx"
        }
        ```
    * failure:
        ```json
        {
            "result": "failed",
            "token": null
        }
        ```


## post /client

register a new 3rdparty application.

- [ ] verify user logged in
- [ ] issue client id/secret
- [ ] store client id/secret into `tinyoauth_client` table


## get /authorize

- [ ] authenticate client
  - [ ] verify user logged in
  - [ ] verify client id/secret
- [ ] update clients table with authoriztion code
- [ ] issue authorization code

* Request
  * General:
    * Request Method: `GET`
  * Headers:
    * Authorization: `Bearer <token>`
  * Payload:
    ```
    response_type: code *
    client_id: s6BhdRkqt3 *
    redirect_uri: url *
    state: xyz
    scope: xxx
    ```
* Response
  * General:
    * Status Code: `302`
  * Payload:
    ```json
    {
      "Location": "https://host:port/path?code=xxx&state=xyz"
    }
    ```
