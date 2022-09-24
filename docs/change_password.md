# POST user/changePassword

        This endpoint is used to change the password of a user.
        default content_type is "application/json",


## request_data

        ```
        request_header = {
                token : bearer <jwt>,
        }
        ```

        ```
        request_params = {
                new_password : new password,
                old_password : old password,
                }
        ```

<!---we need old password because not everyone who has access to session should be able to change password--->


## response_data


<!--- if password is up to standard, then its saved -->
### success response data
        
        ```
        response ={
                status: 204,
        }
        ```
<!--- we chose no content because unless we are logging out we wont delete the token, so no need to refresh , hence 201 changed to 204 -->
        
### error response data
        
        if password is not up to standard

        ```
        response ={
                status: 500,
                message: password does not match the password criteria , hence rejected.
        }
        ```

        if session expired

        ```
                response ={
                        status: 401,
                        message: session expired
                }
        ```
<!--- upon simon's comment, its better for status to be 401 instead of 403 because token here is invalid -->
