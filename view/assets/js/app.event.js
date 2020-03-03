var $body, base_url, __myGlobalSimpleInfo, __socket;
/*var $body,$nav,$nav_left,$side_bar,$no_access;*/

$(function() {
    $body = $('body');

    eventer();
    if (main.getCookie('token') != '') { 
        app_dashboard.init();
        app_product.init();
        app_customer.init();
        app_supplier.init();
        app_sales.init();

        app_home.init(); 
        app_news.init(); 
        app_contact.init(); 
        app_about.init();
        
        /*hotel_matching.init();
        approve_hotel.init();
		city_mapping.init();
		country_mapping.init();
        matching_report.init();*/
        app.run(); 
    } 

   /*$(window).unload(function() {
         if (event.currentTarget.performance.navigation.type == 1 || event.currentTarget.performance.navigation.type == 2) {
            main._page_refresh();
        }   
    });*/


    $(window).on("unload", function(e) {
        if (event.currentTarget.performance.navigation.type == 1 || event.currentTarget.performance.navigation.type == 2) {
            main._page_refresh();
        }
    });

    /*if (window.location.hostname != 'localhost') {
        __socket = io.connect('http://52.19.114.198:3000'); // socketing is fixed;
        __socket.on('check user',function(data){
            if(data.status == 'inactive'){
                $('#session-expired').modal('show');
                if(data.status === 'inactive'){
                    $('#session-expired').find('.session-profile-message').hide();
                    $('#session-expired').find('.session-expired-message').show();
                }else{
                    $('#session-expired').find('.session-profile-message').show();
                    $('#session-expired').find('.session-expired-message').hide();
                }console.log('Expired');
            }
        });
    }*/   

});

function eventer() {
    var self = this;
    //Character Limits

    $body.delegate('.alpha-only', 'keypress', function(e) {
        if((e.charCode < 65 || e.charCode > 90) && (e.charCode < 97 || e.charCode > 122) && e.charCode != 32 && e.charCode !== 0){
            return false;
        }
    });

    $body.delegate('.email-only', 'keypress', function(e) {
        var array = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 46, 64, 95, 45];
            if ($.inArray(e.charCode, array) != -1) {

            }else if(e.charCode === 0){
                return true;
            }else {
                if((e.charCode < 65 || e.charCode > 90) && (e.charCode < 97 || e.charCode > 122))
                    return false;
            }
    });

    $body.delegate('.username-only', 'keypress', function(e) {
        var myChar = String.fromCharCode(e.charCode);
        if (/^[a-zA-Z0-9]+$/g.test(myChar) === false && e.charCode !== 0){
            return false;
        }
    });

    $body.delegate('.alpha-number-space-only', 'keypress', function(e) {
        var array = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 32];
        if ($.inArray(e.charCode, array) != -1) {

        }else if(e.charCode === 0){
            return true;
        }else {
            if((e.charCode < 65 || e.charCode > 90) && (e.charCode < 97 || e.charCode > 122))
                return false;
        }
    });

    $body.delegate('.url-only', 'keypress', function(e) {
        var array = [46, 47, 58, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
        if ($.inArray(e.charCode, array) != -1) {

        }else if(e.charCode === 0){
            return true;
        }else {
            if((e.charCode < 65 || e.charCode > 90) && (e.charCode < 97 || e.charCode > 122))
                return false;
        }
    });

    $body.delegate('.phone-only', 'keypress', function(e) {
        var array = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 40, 41];
        var charStr = String.fromCharCode(e.charCode); //Nahid's code
       
        if ($.inArray(e.charCode, array) != -1) { //Nahid's code : added some filter to avoid character

        }else if(e.charCode === 0){
            return true;
        }else if((e.charCode < 65 || e.charCode > 90) && (e.charCode < 97 || e.charCode > 122) || (/^[0-9-]+$/g.test(charStr) === false)){
            return false;
        }
    });

    $body.delegate('.address-only', 'keypress', function(e) {
        var array = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 32, 44, 46, 35, 39, 32, 45];
        if ($.inArray(e.charCode, array) != -1) {

        }else if(e.charCode === 0){
            return true;
        }else {
            if((e.charCode < 65 || e.charCode > 90) && (e.charCode < 97 || e.charCode > 122))
                return false;
        }
    });

    $body.delegate('.number-only', 'keypress', function(e) {
        var myChar = String.fromCharCode(e.charCode);
       if(/^[0-9]+$/g.test(myChar) === false && e.charCode !== 0){
           return false;
       }
    });

    $body.delegate('.number-decimal-only', 'keypress', function(e) {
     /*   var array = [45, 46];*/
        var input = String.fromCharCode(e.charCode);

       /* if ($.inArray(e.charCode, array) != -1) {

        } else {*/
            if ((e.charCode < 48 || e.charCode > 57) || (e.charCode == 109 || e.charCode == 189)) {
                if (e.charCode == 46 || e.charCode === 0)  { 
                    return true; 
                } 
                else return false; 
            }
        // }
    });

    $body.delegate('.2-decimal-only','keyup',function(e) {
        var $el = $(this),
            val = parseFloat($el.val());

        if(val.countDecimals() > 2) {
            $el.addClass("red-border");
            $el.next().show();
            $el.next().text($.i18n.t("error.shouldbe2decimal"));
        }
        else {
            $el.removeClass("red-border");
            $el.next().hide();
            $el.next().text();
        }
    });

    $body.delegate('.lat-lon-only', 'keypress', function(e) {
        var array = [45, 46, 44];
        if ($.inArray(e.charCode, array) != -1) {

        } else {
            if (e.charCode > 31 && (e.charCode < 48 || e.charCode > 57) && e.charCode !== 0)
                return false;
        }
    });

    
    $body.delegate('.alpha-number-only1', 'keypress', function(e) {
        var array = [95, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 32, 46, 44, 39, 45],
            myChar = String.fromCharCode(e.charCode);
        if ($.inArray(e.charCode, array) != -1) {
        }else if(e.charCode === 0){
            return true;
        }else if((e.charCode < 65 || e.charCode > 90) && (e.charCode < 97 || e.charCode > 122) || /^[a-zA-Z0-9]+$/g.test(myChar) === false){
            return false;
        }
    });

    $body.delegate('.alpha-number-only2', 'keypress', function(e) {
        var array = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 46, 44],
            myChar = String.fromCharCode(e.charCode);
        if ($.inArray(e.charCode, array) != -1) {
        }else if(e.charCode === 0){
            return true;
        }else if((e.charCode < 65 || e.charCode > 90) && (e.charCode < 97 || e.charCode > 122) || /^[a-zA-Z0-9]+$/g.test(myChar) === false){
            return false;
        }
    });
    
    //for top navigation bar

}
