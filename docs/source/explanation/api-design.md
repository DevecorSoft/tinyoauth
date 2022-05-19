# Api design

```{mermaid}
flowchart LR
  subgraph tinyoauth

    subgraph gateway[api gateway]
      request_protected_api[request /protected/resource]
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
- [ ] register user's current clients(issue client id)
- [ ] issue client secret

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
            "client_id": "xxxxx",
            "client_secret": "xxxxx"
        }
        ```
    * failure:
        ```json
        {
            "result": "failed",
            "client_id": null,
            "client_secret": null
        }
        ```


## post /authorize
