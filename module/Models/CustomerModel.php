<?php

namespace Module\Models;

use Codes;
use Crypto;
use Tool;

class CustomerModel extends Model {

	protected $schema = [];

	protected $database;
	protected $validator;

	public function __construct($database = null){
		
		if($database){
			
			$this->database = $database;

		} else {

			$this->database = \Container::get('database');

		}
			$this->validator  = \Container::get('validator');
			$this->MedooModel = new \Module\Models\MedooModel();

	}


	public function addCustomer($parameters){

		$result = $this->MedooModel->insert('customer', $parameters);

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {	

			return true;
	
		}

	}

	public function deleteCustomer($parameters){

		$result = $this->MedooModel->delete('customer', ['customer_id' => $parameters['customer_id']]);

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}

	}

	public function getCustomerById($parameters){

		$result = $this->MedooModel->get('customer', 0, "", ['customer_id' => $parameters['customer_id']]);

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}

	}

	public function updateCustomer($parameters){

		$result = $this->MedooModel->update('customer', $parameters, ['customer_id' => $parameters['customer_id']]);

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {

			return true;
	
		}

	}


}