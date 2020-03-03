var app_customer = function(config) {

    this.is_loaded = false;
	
}

app_customer.prototype = {
	init : function(){
		var self = this;
		
		self._routes();
		self._variables();
		self._events();	
		self._initialize();	
	},
	_variables : function(){
		$tbl_customer			= $body.find('#tbl-customer');
		$mdl_customer			= $body.find('#mdl-add-customer');
		$mdl_customer_edit		= $body.find('#mdl-edit-customer');

		$customer_firstname     = $body.find('.customer-firstname');
		$customer_lastname  	= $body.find('.customer-lastname');
		$customer_email 		= $body.find('.customer-email');
		$customer_phone_no		= $body.find('.customer-phone-no');
		$customer_address		= $body.find('.customer-address');
		$mdl_customer_add_el    = $body.find('.mdl-customer-add-el');

		$customer_firstname_edit    = $body.find('#customer-firstname-edit');
		$customer_lastname_edit  	= $body.find('.customer-lastname-edit');
		$customer_email_edit 		= $body.find('.customer-email-edit');
		$customer_phone_no_edit		= $body.find('.customer-phone-no-edit');
		$customer_address_edit		= $body.find('.customer-address-edit');
		$mdl_customer_add_el_edit   = $body.find('.mdl-customer-add-el-edit');
	},

	_initialize : function() {
		var self = this;
		
		
	},

	_routes : function(){
		var self = this;
		app.get('#/customer', function () { 

			$('.nav-item a').removeClass('active');
			$('.nav-customer').addClass('active');
		    $body.find('.main-content').hide(); 
	        $body.find('.main-content[container-id="customer"]').fadeIn("slow");
	        self._view($tbl_customer, 'customer/view');
	        
	    }); 
	},
	_events : function(){
		var self = this;

		$('body .div-add-customer a').click(function(evt) {
	        evt.preventDefault();
	       	$mdl_customer.find('input').val('');

	       	var $el = $mdl_customer.find('.mdl-customer-add-el');

	       	self._remove_values($el);
	    });

		$body.on('click', '.btn-customer-reset', function() {
			$mdl_customer_edit.find('input').val('');
		});

		$body.on('click', '.btn-customer-save', function(event) {

			var $el = $mdl_customer.find('.mdl-customer-add-el');

			if (self._validate($el)) {
				var data = {
						'firstname' : $customer_firstname.val(),
						'lastname'	: $customer_lastname.val(),
						'email'		: $customer_email.val(),
						'phone_no'	: $customer_phone_no.val(),
						'address'	: $customer_address.val()
				}

				self._add_customer(data);
				
			}

		});

		$body.on('click', '.delete-customer', function(event) {

			var id = $(this).attr('value');

			swal({
			  	title: "Are you sure?",
			  	text: "Once deleted, you will not be able to recover this data!",
			  	icon: "warning",
			  	buttons: true,
			  	dangerMode: true
			})
			.then((willDelete) => {
			  	if (willDelete) {
			    	self._delete_customer(id);
			  	}
			});
			
		});

		$body.on('click', '.update-customer', function(event) {

			var id = $(this).attr('value');
			
			self._edit_customer(id);

		});  

		$body.on('click', '.btn-customer-update', function(event) {

			var $el = $mdl_customer_edit.find('.mdl-customer-edit-el');
			if (self._validate($el)) {
				var data = {
							'customer_id' 	: $mdl_customer_edit.find('#customer-customer_id-edit').val(),
							'firstname'	 	: $mdl_customer_edit.find('#customer-firstname-edit').val(),
							'lastname'		: $mdl_customer_edit.find('#customer-lastname-edit').val(),
							'email'			: $mdl_customer_edit.find('#customer-email-edit').val(),
							'phone_no'		: $mdl_customer_edit.find('#customer-phone-no-edit').val(),
							'address'		: $mdl_customer_edit.find('#customer-address-edit').val()
						};
				
				self._update_customer(data);
			}

		});  

  	},

  	_validate : function(el) {
		var is_valid = true;

		$.each(el, function(index, item) {
			if ($(item).val() === '') {
				$(item).addClass('red-border');
				$(item).next('small').text('Required Field').show();
				is_valid = false;
			} else {	
				$(item).removeClass('red-border');
				$(item).next('small').text('').hide();
			}
		});
		return is_valid;
	}, 

	_remove_values(el){

		$.each(el, function(index, item) {	
			$(item).removeClass('red-border');
			$(item).next('small').text('').hide();
		});
	},

	_add_customer : function(data){
	    var self = this;

  		$.ajax ({
            type    : 'POST',  
            url     :  main.base_url2 + 'customer/add',          
            data    : {
                    'firstname' : data.firstname,
	            	'lastname'  : data.lastname,
	            	'email'  	: data.email,
	            	'phone_no' 	: data.phone_no,
	            	'address'   : data.address     
            },
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
            	$mdl_customer.modal('hide');
            	self._view($tbl_customer, 'customer/view');
            	//main.datatable_refresher($tbl_rewards);
               	main.success_message(data_set.message);
            },
            complete:function(data){
                $("#pre-loader").hide();
            },
            error: function(data_set){
                main.error_message(data_set.responseJSON.message);
            } 
    	});

  	},

  	_view : function($tbl, route){

		var self = this;

		$tbl.dataTable({
			"fixedHeader": true,
            "responsive": true,
			"lengthChange": false, 
            'destroy'      : true,
            'bUseRendered' : false,
            'bDeferRender' : true,
            'bAutoWidth'   : false,
            'bFilter'      : false,
			'bLengthChange': false,
            'ordering'     : false,
            'bServerSide'  : true,
            'aoColumns'    : [
                {
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'customer_id',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
                {
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'firstname',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
            	{
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'lastname',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
            	{
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'email',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
            	{
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'phone_no',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
            	{
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'address',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
                {
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'customer_id',
					render    : function( data, type, row ) {
                		
		                return  '<div class="dropdown">\
								  	<button class="btn btn-success btn-sm no-border-radius dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>\
								  	<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">\
									    <button class="dropdown-item update-customer"  value="'+data+'" >Edit</button>\
									    <button class="dropdown-item delete-customer" value="'+data+'">Delete</button>\
								  	</div>\
								</div>';
					}
            	}
            ],
            'order' : [[ 0, 'desc' ]],
            'ajax' : {
                url : main.base_url2 + 'customer/view',
                data: function ( d ) {

                	d.b_filter = {
                        'firstname'    : '',
                        'lastname'     : ''
                    };

                    d.order[0] = {
                    	'column' : '0',
                    	'dir' 	 : 'desc'
                    }

                },
                type     : 'POST',
                dataType : 'JSON',
                error    : function (e, t, m) {
                    main.error_handler(e, t, m);
                }
            },
            'fnDrawCallback' : function (row, data) {
                /*if(plan_type == 'meal-plan'){  self.is_meal_filtered = false;  }
                else if(plan_type == 'room-plan'){  self.is_room_filtered = false;  }
                main.tooltip();
                main.pagination_hider('tbl-'+plan_type, row._iRecordsTotal, row._iDisplayLength);
                main.pre_loader(null, false);
                $tbl.i18n();*/
            }
        });
	},

	_delete_customer : function(id){
  		
  		var self = this;

  		$.ajax ({
            type    : 'DELETE',  
            url     :  main.base_url2 + 'customer/delete/' + id,
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
            	self._view($tbl_customer, 'customer/view');
               	main.success_message(data_set.message);
            },
            complete:function(data){
                $("#pre-loader").hide();
            },
            error: function(data_set){
                main.error_message(data_set.responseJSON.message);
            } 
    	});

  	},

  	_edit_customer : function(id) {
		var self = this;

		$.ajax({
            type       : 'GET',
            url        : main.base_url2 + 'customer/view/' + id ,
            dataType   : 'JSON',
            timeout    : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success    : function (data_set) {		

                var html = '';        
                html = Mustache.render(_edit_customer, {
                	'customer_id'	: data_set.data.customer_id,
                	'firstname' 	: data_set.data.firstname,
                	'lastname'		: data_set.data.lastname,
                	'email'			: data_set.data.email,
                	'phone_no' 		: data_set.data.phone_no,
                	'address'  		: data_set.data.address,
                });
                
                $mdl_customer_edit.modal('show');
                $mdl_customer_edit.find('.mdl-edit-customer-content').html(html);

                //console.log(html);
            },
            complete:function(data){
              $("#pre-loader").hide();
            },
            error      : function(e, t, m) {
                main.error_message(e.responseJSON.message);
            }
        });	
	},

  	_update_customer : function(data){

	    var self = this;

  		$.ajax ({
            type    : 'POST',  
            url     :  main.base_url2 + 'customer/update', 
            data : data,
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
            	$mdl_customer_edit.modal('hide');
            	self._view($tbl_customer, 'customer/view');
            	//main.datatable_refresher($tbl_rewards);
               	main.success_message(data_set.message);
            },
            complete:function(data){
                $("#pre-loader").hide();
            },
            error: function(data_set){
                main.error_message(data_set.responseJSON.message);
            } 
    	});

  	},

}

var app_customer = new app_customer(null);