var app_supplier = function(config) {

	this.is_loaded = false;
	
}

app_supplier.prototype = {
	init : function(){
		var self = this;
		
		self._routes();
		self._variables();
		self._events();	
		self._initialize();	
	},
	_variables : function(){
		$tbl_supplier			= $body.find('#tbl-supplier');
		$mdl_supplier			= $body.find('#mdl-add-supplier');
		$mdl_supplier_edit		= $body.find('#mdl-edit-supplier');

		$supplier_name  	= $body.find('.supplier-name');
		$supplier_email 		= $body.find('.supplier-email');
		$supplier_contact		= $body.find('.supplier-contact');
		$supplier_address		= $body.find('.supplier-address');
		$mdl_supplier_add_el    = $body.find('.mdl-supplier-add-el');

		$supplier_firstname_edit    = $body.find('#supplier-firstname-edit');
		$supplier_lastname_edit  	= $body.find('.supplier-lastname-edit');
		$supplier_email_edit 		= $body.find('.supplier-email-edit');
		$supplier_phone_no_edit		= $body.find('.supplier-phone-no-edit');
		$supplier_address_edit		= $body.find('.supplier-address-edit');
		$mdl_supplier_add_el_edit   = $body.find('.mdl-supplier-add-el-edit');
	},

	_initialize : function() {
		var self = this;
		
	},

	_routes : function(){
		var self = this;
		app.get('#/supplier', function () { 

			$('.nav-item a').removeClass('active');
			$('.nav-supplier').addClass('active');
		    $body.find('.main-content').hide(); 
	        $body.find('.main-content[container-id="supplier"]').fadeIn("slow");
	        self._view($tbl_supplier, 'supplier/view');
	        
	    }); 
	},
	_events : function(){
		var self = this;

		$('body .div-add-supplier a').click(function(evt) {
	        evt.preventDefault();
	       	$mdl_supplier.find('input').val('');

	       	var $el = $mdl_supplier.find('.mdl-supplier-add-el');

	       	self._remove_values($el);
	    });

		$body.on('click', '.btn-supplier-reset', function() {
			$mdl_supplier_edit.find('input').val('');
		});

		$body.on('click', '.btn-supplier-save', function(event) {

			var $el = $mdl_supplier.find('.mdl-supplier-add-el');

			if (self._validate($el)) {
				var data = {
						'supplier_name' : $supplier_name.val(),
						'email'		    : $supplier_email.val(),
						'contact'	    : $supplier_contact.val(),
						'address'	    : $supplier_address.val()
				}

				self._add_supplier(data);
				
			}

		});

		$body.on('click', '.delete-supplier', function(event) {

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
			    	self._delete_supplier(id);
			  	}
			});
			
		});

		$body.on('click', '.update-supplier', function(event) {

			var id = $(this).attr('value');
			
			self._edit_supplier(id);

		});  

		$body.on('click', '.btn-supplier-update', function(event) {

			var $el = $mdl_supplier_edit.find('.mdl-supplier-edit-el');
			if (self._validate($el)) {
				var data = {
							'supplier_id' 	: $mdl_supplier_edit.find('#supplier-supplier_id-edit').val(),
							'supplier_name'	: $mdl_supplier_edit.find('#supplier-name-edit').val(),
							'email'			: $mdl_supplier_edit.find('#supplier-email-edit').val(),
							'contact'		: $mdl_supplier_edit.find('#supplier-contact-edit').val(),
							'address'		: $mdl_supplier_edit.find('#supplier-address-edit').val()
						};
				
				self._update_supplier(data);
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

	_add_supplier : function(data){
	    var self = this;

  		$.ajax ({
            type    : 'POST',  
            url     :  main.base_url2 + 'supplier/add',          
            data    :  data,
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
            	$mdl_supplier.modal('hide');
            	self._view($tbl_supplier, 'supplier/view');
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
                 	data      : 'supplier_id',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
                {
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'supplier_name',
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
                 	data      : 'contact',
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
                 	data      : 'supplier_id',
					render    : function( data, type, row ) {
                		
		                return  '<div class="dropdown">\
								  	<button class="btn btn-success btn-sm no-border-radius dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>\
								  	<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">\
									    <button class="dropdown-item update-supplier"  value="'+data+'" >Edit</button>\
									    <button class="dropdown-item delete-supplier" value="'+data+'">Delete</button>\
								  	</div>\
								</div>';
					}
            	}
            ],
            'order' : [[ 0, 'desc' ]],
            'ajax' : {
                url : main.base_url2 + 'supplier/view',
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

	_delete_supplier : function(id){
  		
  		var self = this;

  		$.ajax ({
            type    : 'DELETE',  
            url     :  main.base_url2 + 'supplier/delete/' + id,
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
            	self._view($tbl_supplier, 'supplier/view');
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

  	_edit_supplier : function(id) {
		var self = this;

		$.ajax({
            type       : 'GET',
            url        : main.base_url2 + 'supplier/view/' + id ,
            dataType   : 'JSON',
            timeout    : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success    : function (data_set) {		

                var html = '';        
                html = Mustache.render(_edit_supplier, {
                	'supplier_id'	: data_set.data.supplier_id,
                	'name'		    : data_set.data.supplier_name,
                	'email'			: data_set.data.email,
                	'contact' 		: data_set.data.contact,
                	'address'  		: data_set.data.address,
                });
                
                $mdl_supplier_edit.modal('show');
                $mdl_supplier_edit.find('.mdl-edit-supplier-content').html(html);

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

  	_update_supplier : function(data){

	    var self = this;

  		$.ajax ({
            type    : 'POST',  
            url     :  main.base_url2 + 'supplier/update', 
            data : data,
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
            	$mdl_supplier_edit.modal('hide');
            	self._view($tbl_supplier, 'supplier/view');
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

var app_supplier = new app_supplier(null);