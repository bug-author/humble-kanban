description => this api is used for validating user login and password

request_params :username    => 'username', :password => 'password',

response_params :errors => content not found {
                                username & password don't match,
                                username & password match but for old passwords,
                                username doesn't exist, 
                            }, 
                :success_message => {
                                    message:'Successfully logged in username  and password Successfully',
                                    login_token: token,
                                    }