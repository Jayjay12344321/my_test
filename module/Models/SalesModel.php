<?php

namespace Module\Models;

use Codes;
use Crypto;
use Tool;
use PDO;

class SalesModel extends Model {

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

	}


	public function createTransaction($parameters){

		$sales_params = [];
		$sales_params['total_quantity'] = $parameters['total_quantity'];
		$sales_params['markup']        	= $parameters['markup'];
		$sales_params['total_price'] 	= $parameters['total_price'];
		$sales_params['selling_price'] 	= $parameters['selling_price'];
		$sales_params['comments'] 		= $parameters['comments'];
		$sales_params['date_created'] 	= date('Y-m-d H:i:s');

		$this->MedooModel->insert('sales', $sales_params);

		$sales_id = $this->database->query("SELECT MAX(sales_id) AS 'sales_id' FROM sales")->fetchAll(PDO::FETCH_ASSOC);

		if(!$sales_id){
			return false;
		}

		foreach ($parameters['items'] as $key => $value) {

			$value['sales_id'] = (int)$sales_id[0]['sales_id'];

			$this->MedooModel->insert('sales_items', $value);

		}

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {	

			return true;
	
		}

	}


}