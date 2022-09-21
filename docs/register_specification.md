POST auth/register

description  => This API is used for creating a user account if it doesn't exist else redirects to the login page.

request_params => 
                payload =>{
                    username : user.username,
                    user_email : user.email,
                    password : user.password,
                    first_name : user.first_name,
                    last_name : user.last_name,
                    phone_number : user.phone_number,
                    }

response_params => 
            #user created successfully
            success =>{
                message : "Successfully created user account",
                status : 201,
            },

            #user has been created successfully due to one of many reasons

            #username already exists
            error => {
                message : username already exists,
                status : 405, //method is not allowed because username already exists
                }            

            error => {
                message : one of message_choices,
                status : 400, //bad request
                }
            message_choices => [
                "username or email already exists",
                "phone_number already exists",
                "password doesn't qualify",
            ]