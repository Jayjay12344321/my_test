<?php

namespace Module\Models;

use Codes;
use Crypto;
use Tool;
use PDO;

class DashboardModel extends Model {

	protected $schema = [];

	protected $database;
	protected $validator;

	public function __construct($database = null){
		
		if($database){
			
			$this->database = $database;

		} else {

			$this->database = \Container::get('database');

		}
			$this->validator = \Container::get('validator');
			$this->MedooModel = new \Module\Models\MedooModel();
			$this->DiscountModel = new \Module\Models\DiscountModel();

	}

	public function dashboardDetails(){

		$sales     = $this->database->query("SELECT sum(selling_price) AS 'sales' FROM sales")->fetchAll(PDO::FETCH_ASSOC)[0];

		$customers = $this->database->query("SELECT count(customer_id) AS 'customers' FROM customer")->fetchAll(PDO::FETCH_ASSOC)[0];

		$products  = $this->database->query("SELECT count(product_id) AS 'products' FROM product")->fetchAll(PDO::FETCH_ASSOC)[0];

		$suppliers = $this->database->query("SELECT count(supplier_id) AS 'suppliers' FROM supplier")->fetchAll(PDO::FETCH_ASSOC)[0];

		/* CHARTS*/
		$dayly = $this->database->query("
			SELECT
				CONCAT(HOUR(sales.date_created),':00 ', CASE WHEN HOUR(sales.date_created) <= 12 THEN 'AM' ELSE 'PM' END ) AS label, 
          		ROUND(SUM(selling_price),4)   AS `value`
          	FROM     
          		sales
          	WHERE    
          		date(date_created) = date(now())
          	GROUP BY 
          		HOUR(date_created)
        ")->fetchAll(PDO::FETCH_ASSOC);

		$weekly = $this->database->query("
			SELECT
                CASE
                    WHEN WEEKDAY(date_created) = 0 THEN 'MONDAY'
                    WHEN WEEKDAY(date_created) = 1 THEN 'TUESDAY'
                    WHEN WEEKDAY(date_created) = 2 THEN 'WEDNESDAY'
                    WHEN WEEKDAY(date_created) = 3 THEN 'THURSDAY'
                    WHEN WEEKDAY(date_created) = 4 THEN 'FRIDAY'
                    WHEN WEEKDAY(date_created) = 5 THEN 'SATURDAY'
                    WHEN WEEKDAY(date_created) = 6 THEN 'SUNDAY'
                    END as label ,  ROUND(SUM(selling_price),4) AS `value`
            FROM     
            	sales
            WHERE    
            	YEARWEEK(date_created) = YEARWEEK(now())
            GROUP BY 
            WEEKDAY(date_created)
        ")->fetchAll(PDO::FETCH_ASSOC);

		$monthly = $this->database->query("
			SELECT
				DAY(date_created) as 'label' ,  
				ROUND(SUM(selling_price),4) AS `value`
        	FROM     
        		sales
        	WHERE 
        		EXTRACT(YEAR_MONTH FROM date_created) = EXTRACT(YEAR_MONTH FROM now())
        	GROUP BY 
        	DAY(date_created)
        ")->fetchAll(PDO::FETCH_ASSOC);

        $yearly = $this->database->query("
        	SELECT 
        		MONTH(date_created) as 'label' ,  
        		ROUND(SUM(selling_price),4) AS `value`
	        FROM     
	        	sales
	        WHERE 
	        	YEAR(date_created) = YEAR(NOW())
	        GROUP BY 
	        	MONTH(date_created)
	     ")->fetchAll(PDO::FETCH_ASSOC);

		$result = [];
		$result['sales']     = $sales['sales'];
		$result['customers'] = $customers['customers'];
		$result['products']  = $products['products'];
		$result['suppliers'] = $suppliers['suppliers'];

		$arr_dayly   = [];
		$arr_weekly  = [];
		$arr_monthly = [];
		$arr_yearly  = [];
	    
	    foreach ($dayly as $key => $value) {
	        $arr_dayly['label'][] = $value['label'];
	        $arr_dayly['value'][] = (float) $value['value'];
	    }

	    foreach ($weekly as $key => $value) {
	        $arr_weekly['label'][] = $value['label'];
	        $arr_weekly['value'][] = (float) $value['value'];
	    }

	    foreach ($monthly as $key => $value) {
	        $arr_monthly['label'][] = $value['label'];
	        $arr_monthly['value'][] = (float) $value['value'];
	    }
	    
	    foreach ($yearly as $key => $value) {

	    	switch (intval($value['label'])){
              case '1':
                $mresult = 'January';
                break;
              case '2':
                $mresult = 'February';
                break;
              case '3':
                $mresult = 'March';
                break;
              case '4':
                $mresult = 'April';
                break;
              case '5':
                $mresult = 'May';
                break;
              case '6':
                $mresult = 'June';
                break;
              case '7':
                $mresult = 'July';
                break;
              case '8':
                $mresult = 'August';
                break;
              case '9':
                $mresult = 'September';
                break;
              case '10':
                $mresult = 'October';
                break;
              case '11':
                $mresult = 'November';
                break;
              case '12':
                $mresult = 'December';
                break;
            }

	        $arr_yearly['label'][] = $mresult;
	        $arr_yearly['value'][] = (float) $value['value'];
	    }

		$result['charts']['dayly']['label'] = $arr_dayly['label'];
		$result['charts']['dayly']['value'] = $arr_dayly['value'];

		$result['charts']['weekly']['label']  = $arr_weekly['label'];
		$result['charts']['weekly']['value']  = $arr_weekly['value'];

		$result['charts']['monthly']['label'] = $arr_monthly['label'];
		$result['charts']['monthly']['value'] = $arr_monthly['value'];

		$result['charts']['yearly']['label']  = $arr_yearly['label'];
		$result['charts']['yearly']['value']  = $arr_yearly['value'];
		
		return $result;

	}

	public function DashboardList(){

		$result = $this->MedooModel->select('Dashboard', 0, "", 0);
		
		return $result;

	}

}