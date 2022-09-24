# POST auth/register

description : This endpoint is used for creating a user account if it doesn't exist else redirects to the login page.


## request data

    ```
    request_params ={ 
            username : user.username,
            user_email : user.email,
            password : user.password,
            first_name : user.first_name,
            last_name : user.last_name,
            phone_number : user.phone_number,
            }
    ```

<!---success response data :  user created successfully -->
<!-- error response :user has been created successfully due to one of many reasons -->
## response data    
    
    success response data

            ```
            response = {
                message : "Successfully created user account",
                status : 201,
            },
            ```

    error response data
         
        ```    
        response = {
                message : one of message_choices,
                status : 500, //bad request
                }
        ```  
    message choices are as follows for error responses:
        ```      
            message_choices => [
                "username or email already exists",
                "phone_number already exists",
                "password doesn't qualify",
            ]
        ```