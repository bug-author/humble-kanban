# POST auth/changePassword

# request_data

request_params => {
            token : bearer <jwt>,
            new_password : new password,
            old_password : old password,
            }

//we need old password because not everyone who has access to session should be able to change password
# response_params

content_type : "application/json",

# if password is up to standard, then its saved
response ={
        status: 201,
        access_token: refreshed_access_token
        
}

# passwords are not up to the standard
response ={
        status: 401,
        message: password not changed because username and password combination did not match
}

# session expired

response ={
        status: 403,
        message: session expired
}

