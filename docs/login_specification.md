# POST user/login/ 

    This endpoint is used for validating user login and password

## request parameters
    ```
    request_params = {
                username : username or user_email,
                password : password,
    }
    ```


<!-- if username and password combination are correct -->
<!-- #jwt contains username  -->
## response parameters

### success response
    ```
    response_params = {
                token :  <jwt>,
    }
    ```

<!-- if username and password combination are incorrect -->
<!--- if username/user_email is not found -->
### error response data

    ```
    response_params = {
                error : {message},
                status : 401,
                }
    ```

#### when user doesn't exist , since we cant login a user who doesn't exist
    ```
    response_params = {
                error : {message},
                status : 403 
                }
    ```

