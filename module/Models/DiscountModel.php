<?php

namespace Module\Models;

use Codes;
use Tool;

class DiscountModel extends Model {

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



	public function insertDiscountInProduct($parameters){

		$parameters['date_created'] = date("Y-m-d");
		$discount = $parameters['discount'];
		unset($parameters['discount']);

		foreach ($discount as $key => $value) {
			
			$parameters['discount_value'] = $key;
			$parameters['discount_expiry'] = $value;
			$parameters['discount_code'] = Tool::generateToken();

			$result = $this->MedooModel->insert('Discount', $parameters);


		}

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}

	}


	public function getDiscountByProductId($parameters){

		$result = $this->MedooModel->select('Discount', 0, "", ['product_id' => $parameters['product_id']]);

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}


		

	}


	public function removeDiscountData($parameters){

		if($parameters['product_id'] == ""){

			$result = $this->MedooModel->delete('Discount', ['discount_id' => $parameters['discount_id']]);

		} else {

			$result = $this->MedooModel->delete('Discount', ['product_id' => $parameters['product_id']]);

		}

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}


		

	}

}