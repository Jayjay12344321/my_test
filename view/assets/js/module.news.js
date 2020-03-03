var app_news = function(config) {
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

app_news.prototype = {
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
		app.get('#/news', function () { 
	      	
	      	$(".search-product").hide();
	      	$('.topnav a').removeClass('active-class');
	      	$('.topnav a').removeClass('active');
		    main._active_menu('main-link-news');
		    $('.main-link-news').addClass('active');

		    $body.find('.main-content').hide(); 
	        $body.find('.main-content[container-id="search-news"]').fadeIn("slow");
	        
	    }); 
	},
	_events : function(){
		var self = this;



  },
  _get_city_string : function(){
  			var cities = '';
	    	var city_list     = $('#search-modal-pending').select2('data'); 
	    	for(var i = 0; i < city_list.length ; i++){
	    		cities += city_list[i].id  + ","; 
	    	}
	    	cities = cities.slice(0,-1);
	    	return cities;

  }
}

var app_news = new app_news(null);