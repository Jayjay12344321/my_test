var app_home = function(config) {
	this.is_loaded = false,
	this.max_value = 0,
	this.is_valid = true,
	 //this.unmatched_hotels_list = {}, 
  	this.city_ids = [], 
  	this.search_data = {}; 
  	this.distance = 0;
  	this.suggested_hotels = {};
  	this.pending_nav = '';
}

app_home.prototype = {
	init : function(){
		var self = this;
		
		self._routes();
		self._variables();
		self._events();	
		self._initialize();	
	},
	_variables : function(){
		$unmatched_hotels_supplier  = $body.find('.unmatched-hotels-supplier');
		$unmatched_hotels_city  	= $body.find('.unmatched-hotels-city');
		$unmatched_to 				= $body.find('.search-to');
		$unmatched_from 			= $body.find('.search-from');
		$unmatched_sort_by			= $body.find('.search-sort');

		$results_container 			= $body.find('.results-container');
		$results_unmatched          = $body.find('.results-unmatched');

		$recommended_search_hotel   = $body.find('.recommended-search-hotel');
		$recommended_hotel_details  = $body.find('.hotel-details');  

		$unmatched_next				= $body.find('.btn-next');
		$unmatched_back				= $body.find('.btn-back');

		$show_suggested_hotels   	= $body.find('.show-suggested-hotels'); 

		$hotel_name_unmatch                 = $body.find('#hotel-matching-cue-name-search');
 
   		$mdl_show_map        		= $body.find('#mdl-show-map');
   		$pending_report             = $body.find('.search-modal-pending');
	},

	_initialize : function() {
		var self = this;
		
		
	},

	_routes : function(){
		var self = this;
		app.get('#/home', function () { 
	      	
	      	$(".search-product").hide();
	      	$(".view-stud-by-id").hide();
	      	$('.topnav a').removeClass('active-class');
	      	$('.topnav a').removeClass('active');
		    main._active_menu('main-link-home');
		    $('.main-link-home').addClass('active');

		    $body.find('.main-content').hide(); 
	        $body.find('.main-content[container-id="search-home"]').fadeIn("slow");

	        self._view_student();
	        
	        
	    }); 
	},
	_events : function(){
		var self = this;

		$(".btn-add-student").on('click', function() {
			$(".view-stud-by-id").hide();
	        $(".search-product").show();
	    });

	    $(".btn-save-student").on('click', function() {

	        var firstname = $body.find('.save-student-firstname').val(),
	       		lastname  = $body.find('.save-student-lastname').val(),
	        	bod       = $body.find('.save-student-bod').val(),
            	address   = $body.find('.save-student-address').val();

            var objDetails = {
            	firstname : firstname,
            	lastname  : lastname,
            	bod 	  : bod,
            	address   : address
            }

            self._add_student(objDetails);
            self._view_student();

	    });

	    $("#lstStudents").change(function(){
	    	var id = $("select[name=lstStud]").val();
		  	self._view_student_by_id(id);
		});

		$body.on('click', '.btn-edit-student', function(event) {
			var name = $("input[name=search-name]").val();
			alert(name);
		});

		$body.on('keyup', '.search-name', function() {
			var name = $("input[name=search-name]").val();
			alert(name);
		});

  	},

  	_add_student : function(data){

  		/*main.pre_loader(null, true);
	    $body.find('.cssload-bokeh').show(); */
	    
  		$.ajax ({
            type    : 'POST',  
            url     :  main.base_url2 + 'student/add',          
            data    : {
                    'firstname' : data.firstname,
	            	'lastname'  : data.lastname,
	            	'bod' 	    : data.bod,
	            	'address'   : data.address     
            },
            dataType: "JSON",
            timeout : main.timeout,
            success : function(data_set) {
               main.success_message(data_set.message);
               $(".search-product").hide();
            },

            error: function(data_set){
                main.error_message(data_set.responseJSON.message);
            } 
    	});

  	},

  	_view_student : function(){
  		
  		$.ajax({
	        type: 'GET',
	        url: main.base_url2 + 'student/view', 
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
	                    'value' : item.student_id,
	                    'name'  : item.firstname + ' ' + item.lastname
	                });
	            });

	            $("#lstStudents").html(__user_type);

	        },
	        error: function(e, t, m) {
	            main.error_handler(e, t, m);
	        }
	    });

  	},

  	_view_student_by_id : function(id){
  		
  		$.ajax({
	        type: 'GET',
	        url: main.base_url2 + 'student/view_by_id/' + id, 
	        dataType: 'JSON',
	        async : false,
	        timeout: main.timeout,
	        beforeSend: function(xhr) {
	           
	        },
	        success: function(data_set) {

	           var html = Mustache.render(__view_student_by_id_content,{
					'student_id': data_set.data.student_id,
					'firstname' : data_set.data.firstname,
					'lastname'  : data_set.data.lastname,
					'bod'       : data_set.data.bod,
					'address'   : data_set.data.address
				});

	           	$(".search-product").hide();
	            $(".view-student-by-id").html(html);

	        },
	        error: function(e, t, m) {
	            main.error_handler(e, t, m);
	        }
	    });

  	},

}

var app_home = new app_home(null);