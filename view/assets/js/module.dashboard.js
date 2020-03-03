var app_dashboard = function(config) {
	this.is_loaded = false;
}

app_dashboard.prototype = {
	init : function(){
		var self = this;
		
		self._routes();
		self._variables();
		self._events();	
		self._initialize();	
	},
	_variables : function(){
		$total_sales  		= $body.find('.dashboard-total-sales');
		$total_products  	= $body.find('.dashboard-total-products');
		$total_customers 	= $body.find('.dashboard-total-customers');
		$total_suppliers 	= $body.find('.dashboard-total-suppliers');
	},

	_initialize : function() {
		var self = this;
		
		
	},

	_routes : function(){
		var self = this;
		app.get('#/dashboard', function () { 
	      	
	      	$('.nav-item a').removeClass('active');
			$('.nav-dashboard').addClass('active');
		    $body.find('.main-content').hide(); 
	        $body.find('.main-content[container-id="dashboard"]').fadeIn("slow");

	        self._dashboard_details();
	        
	        
	    }); 
	},
	_events : function(){
		var self = this;

		$(".btn-add-dashboard").on('click', function() {
			$(".view-stud-by-id").hide();
	        $(".search-product").show();
	    });

	    $(".btn-save-dashboard").on('click', function() {

	        var firstname = $body.find('.save-dashboard-firstname').val(),
	       		lastname  = $body.find('.save-dashboard-lastname').val(),
	        	bod       = $body.find('.save-dashboard-bod').val(),
            	address   = $body.find('.save-dashboard-address').val();

            var objDetails = {
            	firstname : firstname,
            	lastname  : lastname,
            	bod 	  : bod,
            	address   : address
            }

            self._add_dashboard(objDetails);
            self._view_dashboard();

	    });

	    $("#lstdashboards").change(function(){
	    	var id = $("select[name=lstStud]").val();
		  	self._view_dashboard_by_id(id);
		});

		$body.on('click', '.btn-edit-dashboard', function(event) {
			var name = $("input[name=search-name]").val();
			alert(name);
		});

		$body.on('keyup', '.search-name', function() {
			var name = $("input[name=search-name]").val();
			alert(name);
		});

		$body.on('click', '.btn-chart-dayly', function(event) {
			$('.charts-buttons button').removeClass('active');
			$(this).addClass('active');
			$body.find('.container-charts').hide(); 
	        $body.find('.container-charts[container-sales="dayly"]').fadeIn("slow");
		});

		$body.on('click', '.btn-chart-weekly', function(event) {
			$('.charts-buttons button').removeClass('active');
			$(this).addClass('active');
			$body.find('.container-charts').hide(); 
	        $body.find('.container-charts[container-sales="weekly"]').fadeIn("slow");
		});

		$body.on('click', '.btn-chart-monthly', function(event) {
			$('.charts-buttons button').removeClass('active');
			$(this).addClass('active');
			$body.find('.container-charts').hide(); 
	        $body.find('.container-charts[container-sales="monthly"]').fadeIn("slow");
		});

		$body.on('click', '.btn-chart-yearly', function(event) {
			$('.charts-buttons button').removeClass('active');
			$(this).addClass('active');
			$body.find('.container-charts').hide(); 
	        $body.find('.container-charts[container-sales="yearly"]').fadeIn("slow");
		});

  	},

  	_dashboard_details : function(){

  		var self = this;
  		
  		$.ajax({
	        type: 'GET',
	        url: main.base_url2 + 'dashboard/details', 
	        dataType: 'JSON',
	        async : false,
	        timeout: main.timeout,
	        beforeSend: function(xhr) {
	           	$("#pre-loader").show();
	        },
	        success: function(data_set) {

	            $total_sales.text(data_set.data.sales);
	            $total_products.text(data_set.data.products);
	            $total_customers.text(data_set.data.customers);
	            $total_suppliers.text(data_set.data.suppliers);

	            var day_value = data_set.data.charts.dayly.value; 
	            var day_label = data_set.data.charts.dayly.label; 

	            var weekly_value = data_set.data.charts.weekly.value; 
	            var weekly_label = data_set.data.charts.weekly.label; 

	            var monthly_value = data_set.data.charts.monthly.value; 
	            var monthly_label = data_set.data.charts.monthly.label; 

	            var yearly_value = data_set.data.charts.yearly.value; 
	            var yearly_label = data_set.data.charts.yearly.label; 

	            $body.find('.container-charts').hide();
	            $('.charts-buttons button').removeClass('active');
				$body.find('.btn-chart-dayly').addClass('active');
	            $body.find('.container-charts[container-sales="dayly"]').fadeIn("slow");
	            self._sales_chart('.chart-dayly',  day_value,    day_label, 'USD');
	            self._sales_chart('.chart-weekly', weekly_value, weekly_label, 'USD');
	            self._sales_chart('.chart-monthly',monthly_value,monthly_label, 'USD');
	            self._sales_chart('.chart-yearly', yearly_value, yearly_label, 'USD');

	        },
	        complete:function(data){
                $("#pre-loader").hide();
            },
	        error: function(e, t, m) {
	            main.error_handler(e, t, m);
	        }
	    });

  	},

  	_sales_chart : function(container, value, label, currency) {
		$body.find(container).highcharts({
	        chart: {
	            type: 'areaspline'
	        },
	        title: {
	            text: 'Sales'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'left',
	            verticalAlign: 'top',
	            x: 150,
	            y: 100,
	            floating: true,
	            borderWidth: 1,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	        },
	        xAxis: {
	            categories: label
	        },
	        yAxis: {
	            title: {
	                text: currency
	            }
	        },
	        tooltip: {
	            shared: true,
	            valueSuffix: ' ' + currency
	        },
	        credits: {
	            enabled: false
	        },
	        plotOptions: {
	            areaspline: {
	                fillOpacity: 0.5
	            }
	        },
	        series: [{
	            name: 'Sales',
	            data: value
	        }]
	    });
	}

}

var app_dashboard = new app_dashboard(null);