POST auth/login/ 

description => this api is used for validating user login and password

request_params => {
            username : username or user_email,
            password : password,
}


#if username and password combination are correct
#jwt contains username 
response_params => {
            token : bearer <jwt>,
}

#if username and password combination are incorrect
response_params => {
            error : {message}, status : 401 or 403,
            }

#if username/user_email is not found
response_params => {
            error : {message}, status : 401
            }

