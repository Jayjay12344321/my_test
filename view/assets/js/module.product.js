var app_product = function(config) {

	this.is_loaded = false;
	
}

app_product.prototype = {
	init : function(){
		var self = this;
		
		self._routes();
		self._variables();
		self._events();	
		self._initialize();	
	},
	_variables : function(){
		$tbl_product			= $body.find('#tbl-product');
		$mdl_product			= $body.find('#mdl-add-product');
		$mdl_product_edit		= $body.find('#mdl-edit-product');

		$product_code             	= $body.find('.product-code');
		$product_name  	         	= $body.find('.product-name');
		$product_description	  	= $body.find('.product-description');
		$product_quatity		  	= $body.find('.product-quantity');
		$product_category_id		= $body.find('.product-category');
		$product_supplier_price		= $body.find('.product-price');
		$product_supplier_id		= $body.find('.product-supplier');

		$mdl_product_add_el    = $body.find('.mdl-product-add-el');

		$product_product_id_edit        = $body.find('.product-product_id_edit');
		$product_category_id_edit		= $body.find('.product-category_edit');
		$product_name_edit  	        = $body.find('.product-name_edit');
		$product_description_edit	  	= $body.find('.product-description_edit');
		$product_quatity_edit		  	= $body.find('.product-quantity_edit');
		$product_supplier_price_edit	= $body.find('.product-price_edit');
		$product_supplier_id_edit		= $body.find('.product-supplier_edit');
	},

	_initialize : function() {
		var self = this;
		
		
	},

	_routes : function(){
		var self = this;
		app.get('#/product', function () { 

			$('.nav-item a').removeClass('active');
			$('.nav-product').addClass('active');
		    $body.find('.main-content').hide(); 
	        $body.find('.main-content[container-id="product"]').fadeIn("slow");
	        self._view($tbl_product, 'product/view');
	        self._product_details('view',null,null);
	      	
	    }); 
	},
	_events : function(){
		var self = this;

		$('body .div-add-product a').click(function(evt) {

	        evt.preventDefault();

	       	$mdl_product.find('input').val('');
	       	//$mdl_product.find('select').val('');
	       	$mdl_product.find('textarea').val('');

	       	var $el = $mdl_product.find('.mdl-product-add-el');

	       	self._remove_values($el);

	       	var code = self._code_generator(7);

	        $('#product-code').val(code)

	    });

		$body.on('click', '.btn-product-reset', function() {
			$mdl_product_edit.find('input').val('');
		});

		$body.on('click', '.btn-product-save', function(event) {

			var $el = $mdl_product.find('.mdl-product-add-el');

			if (self._validate($el)) {
				var data = {
						'product_code'	 : $product_code.val(),
						'product_name'   : $product_name.val(),
						'description'	 : $product_description.val(),
						'quatity'		 : $product_quatity.val(),
						'category_id'	 : $product_category_id.val(),
						'supplier_price' : $product_supplier_price.val(),
						'supplier_id'	 : $product_supplier_id.val()
				}

				self._add_product(data);
				
			}

		});

		$body.on('click', '.delete-product', function(event) {

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
			    	self._delete_product(id);
			  	}
			});
			
		});

		$body.on('click', '.update-product', function(event) {

			var id = $(this).attr('value');
			
			self._edit_product(id);

		});  

		$body.on('click', '.btn-product-update', function(event) {

			var $el = $mdl_product_edit.find('.mdl-product-edit-el');
			if (self._validate($el)) {
				var data = {
							'product_id' 	 : $mdl_product_edit.find('.product-product_id_edit').val(),
							'category_id' 	 : $mdl_product_edit.find('.product-category-edit').val(),
							'product_name' 	 : $mdl_product_edit.find('.product-name-edit').val(),
							'description' 	 : $mdl_product_edit.find('.product-description-edit').val(),
							'quatity' 	     : $mdl_product_edit.find('.product-quantity-edit').val(),
							'supplier_price' : $mdl_product_edit.find('.product-price-edit').val(),
							'supplier_id' 	 : $mdl_product_edit.find('.product-supplier-edit').val()
						};
				
				self._update_product(data);
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

	_add_product : function(data){
	    var self = this;

  		$.ajax ({
            type    : 'POST',  
            url     :  main.base_url2 + 'product/add', 
            data    : data,
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
            	$mdl_product.modal('hide');
            	self._view($tbl_product, 'product/view');
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
                 	data      : 'product_id',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
                {
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'product_code',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
            	{
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'product_name',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
            	{
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'quatity',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
            	{
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'category_name',
                 	render    : function( data, type, row ) {

                 		return  '<div class="">\
								  	<h5>' + data + '</h5>\
								</div>';
                 	}
            	},
            	{
                	bSortable : false,
                    aTargets  : [-1],
                 	data      : 'supplier_price',
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
                 	data      : 'product_id',
					render    : function( data, type, row ) {
                		
		                return  '<div class="dropdown">\
								  	<button class="btn btn-success btn-sm no-border-radius dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>\
								  	<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">\
									    <button class="dropdown-item update-product"  value="'+data+'" >Edit</button>\
									    <button class="dropdown-item delete-product" value="'+data+'">Delete</button>\
								  	</div>\
								</div>';
					}
            	}
            ],
            'order' : [[ 0, 'desc' ]],
            'ajax' : {
                url : main.base_url2 + 'product/view',
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

	_delete_product : function(id){
  		
  		var self = this;

  		$.ajax ({
            type    : 'DELETE',  
            url     :  main.base_url2 + 'product/delete/' + id,
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
            	self._view($tbl_product, 'product/view');
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

  	_edit_product : function(id) {
		var self = this;

		$.ajax({
            type       : 'GET',
            url        : main.base_url2 + 'product/view/' + id ,
            dataType   : 'JSON',
            timeout    : main.timeout,
            beforeSend: function(){
			    $("#pre-loader").show();
			},
            success    : function (data_set) {		

                var html = '';        
                html = Mustache.render(_edit_product, {
                	'product_id'	 : data_set.data.product_id,
                	'product_code' 	 : data_set.data.product_code,
                	'product_name'	 : data_set.data.product_name,
                	'description'	 : $.trim(data_set.data.description),
                	'quatity' 		 : data_set.data.quatity,
                	'category_id' 	 : data_set.data.category_id,
                	'supplier_price' : data_set.data.supplier_price,
                	'supplier_id'  	 : data_set.data.supplier_id,
                });
                
                $mdl_product_edit.modal('show');
                $mdl_product_edit.find('.mdl-edit-product-content').html(html);

                self._product_details('edit',data_set.data.category_id, data_set.data.supplier_id);
            },
            complete:function(data){
		   		$("#pre-loader").hide();
		   	},
            error      : function(e, t, m) {
                main.error_message(e.responseJSON.message);
            }
        });	
	},

  	_update_product : function(data){

	    var self = this;

  		$.ajax ({
            type    : 'POST',  
            url     :  main.base_url2 + 'product/update', 
            data : data,
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
            	$mdl_product_edit.modal('hide');
            	self._view($tbl_product, 'product/view');
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

  	_product_details: function(action, category_id, supplier_id){

  		var self = this;

  		$.ajax({
	        type: 'GET',
	        url: main.base_url2 + 'product/product_details', 
	        dataType: 'JSON',
	        async : false,
	        timeout: main.timeout,
	        beforeSend: function(xhr) {
	           
	        },
	        success: function(data_set) {

	        	var supplier_data = data_set.data.supplier;
	            var category_data = data_set.data.category;

	            __supplier_details = '';
	            __category_details = '';

	            $.each(supplier_data, function(index, item) {

	            	var selected = '';

	            	if(action == 'edit'){
	            		selected = supplier_id == item.supplier_id ? 'selected' : '';
	            	}

	                __supplier_details += Mustache.render(_select_option_supplier_template, {
	                    'value'    : item.supplier_id,
	                    'name'     : item.supplier_name,
	                    'selected' : selected
	                });
	            });

	            $.each(category_data, function(index, item) {

	            	var selected = '';

	            	if(action == 'edit'){
	            		selected = category_id == item.category_id ? 'selected' : '';
	            	}

	                __category_details += Mustache.render(_select_option_category_template, {
	                    'value'    : item.category_id,
	                    'name'     : item.category_name,
	                    'selected' : selected 
	                });
	            });

	            $("body #product-supplier").html(__supplier_details);
	            $("body #product-category").html(__category_details);

	        },
	        error: function(e, t, m) {
	            main.error_handler(e, t, m);
	        }
	    });

  	},

  	_code_generator: function(length){

  		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		
		for(var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		
		return text;
  	}

}

var app_product = new app_product(null);