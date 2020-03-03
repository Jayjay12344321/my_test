var app_sales = function(config) {

    this.is_loaded = false;
    this.arr_items_sales = [];
	
}

app_sales.prototype = {
	init : function(){
		var self = this;
		
		self._routes();
		self._variables();
		self._events();	
		self._initialize();	
	},
	_variables : function(){
    $tblrows          = $body.find("#tbl-sales tbody tr");
		$tbl_sales			  = $body.find('#tbl-sales');
		$mdl_sales			  = $body.find('#mdl-add-sales');
		$mdl_sales_edit		= $body.find('#mdl-edit-sales');

    $mdl_markup_edit   = $body.find('#mdl-edit-markup');

	},

	_initialize : function() {
		var self = this;
		
		
	},

	_routes : function(){
		var self = this;
		app.get('#/sales', function () { 

			$('.nav-item a').removeClass('active');
			$('.nav-sales').addClass('active');
		    $body.find('.main-content').hide(); 
	        $body.find('.main-content[container-id="sales"]').fadeIn("slow");
	        //self._view($tbl_sales, 'sales/view');
          self._product_list();
	        
	    }); 
	},
	_events : function(){
  		var self = this;

  		$('body .div-add-sales a').click(function(evt) {
  	        evt.preventDefault();
  	       	$mdl_sales.find('input').val('');

  	       	var $el = $mdl_sales.find('.mdl-sales-add-el');

  	       	self._remove_values($el);
  	    });

  		$body.on('click', '.btn-sales-reset', function() {
  			$mdl_sales_edit.find('input').val('');
  		});

  		$body.on('click', '.btn-sales-save', function(event) {

  			var $el = $mdl_sales.find('.mdl-sales-add-el');

  			if (self._validate($el)) {
  				var data = {
  						'firstname' : $sales_firstname.val(),
  						'lastname'	: $sales_lastname.val(),
  						'email'		: $sales_email.val(),
  						'phone_no'	: $sales_phone_no.val(),
  						'address'	: $sales_address.val()
  				}

  				self._add_sales(data);
  				
  			}

  		});

  		$body.on('click', '.delete-sales', function(event) {

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
  			    	self._delete_sales(id);
  			  	}
  			});
  			
  		});

  		$body.on('click', '.update-sales', function(event) {

  			var id = $(this).attr('value');
  			
  			self._edit_sales(id);

  		});  

  		$body.on('click', '.btn-sales-update', function(event) {

    			var $el = $mdl_sales_edit.find('.mdl-sales-edit-el');
    			if (self._validate($el)) {
    				var data = {
    							'sales_id' 	: $mdl_sales_edit.find('#sales-sales_id-edit').val(),
    							'firstname'	 	: $mdl_sales_edit.find('#sales-firstname-edit').val(),
    							'lastname'		: $mdl_sales_edit.find('#sales-lastname-edit').val(),
    							'email'			: $mdl_sales_edit.find('#sales-email-edit').val(),
    							'phone_no'		: $mdl_sales_edit.find('#sales-phone-no-edit').val(),
    							'address'		: $mdl_sales_edit.find('#sales-address-edit').val()
    						};
    				
    				self._update_sales(data);
    			}

    	}); 

        $("body #sales-product-list").change(function(){

            $(this).find("option:selected").each(function(){

                var optionValue = $(this).attr("value");
                  
                var bol_item_exists = self.arr_items_sales.includes(optionValue);

                if(!bol_item_exists){
                    $("body .tbl-add-sales").show();
                    self.arr_items_sales.push(optionValue);
                    self._view_product_id(optionValue);
                }

                if(optionValue){
                    // $(".box").not("." + optionValue).hide();
                    // $("." + optionValue).show();
                } else{
                      // $(".box").hide();
                }

          });

      }).change();

      $body.on('click', '.btn-sales-delete', function(event) {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {

              var id = $(this).attr('data-id');

              for( var i = 0; i < self.arr_items_sales.length; i++){ 
                  if (self.arr_items_sales[i] == id) {
                      self.arr_items_sales.splice(i, 1); 
                  }
              }

              $(this).parents("tr").remove();

              if(self.arr_items_sales.length < 1){
                  $body.find('.tbl-add-sales').hide();
              }

              var tbody = $('body .btn-sales-add').closest("tbody");
              
              var tr_price = tbody.find("tr .sales-total-price");
              var sum_price = 0;
              $.each(tr_price, function(i, item) {

                  var sum = item.innerHTML == '' ? 0 : parseFloat(item.innerHTML);

                  sum_price = sum_price + sum;

              });

              var tr_quantity = tbody.find("tr .edit-sales-quantity");
              var sum_quantity = 0;
              $.each(tr_quantity, function(i, item) {

                  var sum = item.innerHTML == '' ? 0 : parseFloat(item.innerHTML);

                  sum_quantity = sum_quantity + sum;
              });

              var markup = $body.find('.sales-markup').text();
              markup = parseInt(markup);

              var percentage    = 1 + (markup / 100);
              var selling_price = (sum_price * percentage).toFixed(2);

              $('.total-summation-price').text(sum_price);
              $('.total-summation-items').text(sum_quantity);
              $('.total-selling-price').text(selling_price);

            }
        });

      });  

      $body.on('keyup', '.edit-sales-quantity', function(event) {

        var id, total_quantity, price, quatity, total_price;

        id = $(this).attr('data-id');

        price = $(this).closest("tr").find('.sales-price').text();

        total_quantity = $(this).closest("tr").find('.sales-total-quantity').text();

        quatity = $(this).closest("tr").find('.edit-sales-quantity').text();

        if(quatity == ''){
          quatity = 0;
        }
        
        quatity = parseInt(quatity);

        if(quatity > total_quantity){

            swal("Oops!", "Quantity must not exceed to " + total_quantity + " !", "warning");
            $(this).text('0');
            quatity = $(this).closest("tr").find('.edit-sales-quantity').text();
            quatity = parseInt(quatity);

        }
        
        total_price = price * quatity;

        $(this).closest("tr").find('.sales-total-price').text(total_price);

        var tbody = $(this).closest("tbody");
        
        var tr_price = tbody.find("tr .sales-total-price");
        var sum_price = 0;
        $.each(tr_price, function(i, item) {

            var sum = item.innerHTML == '' ? 0 : parseFloat(item.innerHTML);

            sum_price = sum_price + sum;

        });

        var tr_quantity = tbody.find("tr .edit-sales-quantity");
        var sum_quantity = 0;
        $.each(tr_quantity, function(i, item) {

            var sum = item.innerHTML == '' ? 0 : parseFloat(item.innerHTML);

            sum_quantity = sum_quantity + sum;
        });

        var markup = $body.find('.sales-markup').text();
        markup = parseInt(markup);

        var percentage    = 1 + (markup / 100);
        var selling_price = (sum_price * percentage).toFixed(2);

        $('.total-summation-price').text(sum_price);
        $('.total-summation-items').text(sum_quantity);
        $('.total-selling-price').text(selling_price);

      }); 

      $body.on('click', '.sales-edit-markup', function(event) {

          var markup = $body.find('.sales-markup').text();
          $body.find('.edit-markup').val(markup);

      }); 

      $body.on('click', '.btn-edit-markup-update', function(event) {

          var $el = $body.find('.edit-markup-el');

          if (self._validate($el)) {

              var markup = $body.find('.edit-markup').val();

              markup = parseInt(markup);

              if(markup <= 100){
                  $body.find('.sales-markup').text(markup);

                  var total_price = $('.total-summation-price').text();

                  var percentage    = 1 + (markup / 100);
                  var selling_price = (total_price * percentage).toFixed(2);

                  $('.total-selling-price').text(selling_price);

                  $mdl_markup_edit.modal('hide');
                  swal("Success!", "Successfully Updated!", "success");
              }else{
                  $body.find('.edit-markup').addClass('red-border');
                  $body.find('.edit-markup').next('small').text('Markup must be less than 100').show();
              }

          }
          
      }); 

      $body.on('keyup', '.edit-markup', function(event) {

          $body.find('.edit-markup').removeClass('red-border');
          $body.find('.edit-markup').next('small').text('').hide();

          var markup = $body.find('.edit-markup').val();

          markup = parseInt(markup);

          if(markup > 100){
              $body.find('.edit-markup').addClass('red-border');
              $body.find('.edit-markup').next('small').text('Markup must be less than 100').show();
          }

      }); 

      $body.on('click', '.btn-check-out-items', function(event){
       
        var sales_items   = $body.find("tr.add-product-sales-items");
        var total_items   = $body.find('.total-summation-items').text();
        var total_prices  = $body.find('.total-summation-price').text();
        var markup        = $body.find('.sales-markup').text();
        var selling_price = $body.find('.total-selling-price').text();
        var comments      = $body.find('.sales-comments').val();

        var ctr = 0;

        if(sales_items.length > 0 && total_items > 0){

          swal({
            title: "Warning",
            text: "Are you sure, you want to check out these items?",
            icon: "info",
            buttons: true,
            dangerMode: false
          })
          .then((willDelete) => {
            if (willDelete) {

               var arr_items = [];
        
              $.each(sales_items, function(index, item) {

                var product_id     = $(this).attr('data-id');

                var price          = $(this).find('.sales-price').text();

                var total_price    = $(this).find('.sales-total-price').text();

                var quantity = $(this).find('.edit-sales-quantity').text();
                    quantity = parseInt(quantity);
                
                if(quantity < 1){
                  return;
                }

                var data = {
                  'product_id'  : product_id,
                  'price'       : price,
                  'quantity'    : quantity,
                  'total_price' : total_price
                }

                arr_items[ctr++] = data;

              });
             
              var arr_data = {
                'items'          : arr_items,
                'total_quantity' : total_items,
                'markup'         : markup,
                'total_price'    : total_prices,
                'selling_price'  : selling_price,
                'comments'       : comments
              }

              self._create_transaction(arr_data);
            }
          });

         
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

  _product_list: function(){

      var self = this;

      $.ajax({
          type: 'GET',
          url: main.base_url2 + 'product/list', 
          dataType: 'JSON',
          async : false,
          timeout: main.timeout,
          beforeSend: function(xhr) {
             
          },
          success: function(data_set) {

              var data         = data_set.data;

              __details = '';

              $.each(data, function(index, item) {

                  __details += Mustache.render(_select_option_product_template, {
                      'value' : item.product_id,
                      'name'  : item.product_name 
                  });
              });

              $("body #sales-product-list").html(__details);
          },
          error: function(e, t, m) {
              main.error_handler(e, t, m);
          }
      });

    },

  _view_product_id : function(id) {
    var self = this;

    $.ajax({
            type       : 'GET',
            url        : main.base_url2 + 'product/view/' + id ,
            dataType   : 'JSON',
            timeout    : main.timeout,
            success    : function (data_set) {  

                var html = '';        
                html = Mustache.render(_sales_item_template, {
                  'category_id'     : data_set.data.category_id,
                  'description'     : data_set.data.description,
                  'product_code'    : data_set.data.product_code,
                  'product_id'      : data_set.data.product_id,
                  'product_name'    : data_set.data.product_name,
                  'quatity'         : data_set.data.quatity,
                  'supplier_id'     : data_set.data.supplier_id,
                  'supplier_price'  : data_set.data.supplier_price
                });

                $("body .add-product-sales").append(html);
                
            },
            error      : function(e, t, m) {
                main.error_message(e.responseJSON.message);
            }
        }); 
  },

	_create_transaction : function(data){
	    var self = this;
      
  		$.ajax ({
            type    : 'POST',  
            url     :  main.base_url2 + 'sales/create_transaction',          
            data    : data,
            dataType: "JSON",
            timeout : main.timeout,
            beforeSend: function(){
                $("#pre-loader").show();
            },
            success : function(data_set) {
              main.success_message(data_set.message);
            },
            complete:function(data){
                $("#pre-loader").hide();
            },
            error: function(data_set){
                main.error_message(data_set.responseJSON.message);
            } 
    	});

  	}

}

var app_sales = new app_sales(null);