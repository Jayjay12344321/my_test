var $login_body;

$(function() {

    $login_body = $('body');
    login_events();
    user_type();
    
});

function user_type(){
    $.ajax({
        type: 'GET',
        url: main.base_url2 + 'user/user_type', 
        dataType: 'JSON',
        async : false,
        timeout: main.timeout,
        beforeSend: function(xhr) {
           
        },
        success: function(data_set) {
            var data         = data_set.data;
                __user_type = '';
            $.each(data, function(index, item) {
                __user_type += Mustache.render(__option_select_template, {
                    'value' : item.user_description_id,
                    'name'  : item.user_description 
                });
            });

            $("#usertype").html(__user_type);

        },
        error: function(e, t, m) {
            main.error_handler(e, t, m);
        }
    });
}

function login_events(){
    var self = this;

    $(".login-btn").on('click', function() {
        $(".login-btn-enabled").hide();
        $(".login-btn-disabled").show();
        var username = $.trim($login_body.find('.login-username').val()),
            password = $.trim($login_body.find('.login-password').val()),
            usertype = $.trim($login_body.find('.login-usertype option:selected').val())
            ;

        if (username != '' && username != null &&
            password != '' && password != '') {
            self._logins(username, password, usertype);

        } else {
           main.warning_message("Username and Password is Required");
           $(".login-btn-disabled").hide();
           $(".login-btn-enabled").show();
        }
    });
}

function _logins(username, password, usertype) {
    $.ajax ({
            type    : 'POST',  
            //url     :  main.base_url + 'login',  
            url     :  main.base_url2 + 'login',          
            data    : {
                        'username' : username,
                        'password' : password,
                        'user_type': usertype
                        
            },
            dataType: "JSON",
            timeout : main.timeout,
            success : function(data_set) {
                //main.success_message(data_set.message);
                main.createCookie('token', data_set.user_token);

                var regex = new RegExp('/[^/]*$');
                var href = window.location.href.replace(regex, '/');
                console.log(href);
                location.href = (window.location.hostname==='localhost') ? (href)+'main2.html': main.cookie + 'main2.html'; 
            },

            error: function(data_set){
                main.error_message(data_set.responseJSON.message);
                $(".login-btn-enabled").show();
                $(".login-btn-disabled").hide();
            } 
    });
}

