description  => This API is used for creating a user account if it doesn't exist else redirects to the login page.

request_params => {
                    username => user.username,
                    password => user.password,
                    first_name => user.first_name,
                    last_name => user.last_name,
                    user_details => user.user_details,
                    }

response_params => 
            success =>{
                message => "Successfully created user account",
                additional_information => "login at login page or authenticate you email address",
            },
            error => {
                username already exists,
                password doesn't match standards,
                }            