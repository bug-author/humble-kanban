description => this api is used for changing the current password for user

request_params => {
                username => username,
                password => current_password,
                password => new_password,
                }

response_params => {
                success => {message => 'Password changed successfully'}
                error => {
                    'current_password doesn't match',
                    'please don't use the same password',
                    'please don't reuse one of the old passwords',
                    'user doesn't exist',
                        }
}