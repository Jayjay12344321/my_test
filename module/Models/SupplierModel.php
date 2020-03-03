<?php

namespace Module\Models;

use Codes;
use Crypto;
use Tool;

class SupplierModel extends Model {

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


	public function addSupplier($parameters){

		$result = $this->MedooModel->insert('supplier', $parameters);

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {	

			return true;
	
		}

	}

	public function deleteSupplier($parameters){

		$result = $this->MedooModel->delete('supplier', ['supplier_id' => $parameters['supplier_id']]);

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}

	}

	public function getSupplierById($parameters){

		$result = $this->MedooModel->get('supplier', 0, "", ['supplier_id' => $parameters['supplier_id']]);

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}

	}

	public function updateSupplier($parameters){

		$result = $this->MedooModel->update('supplier', $parameters, ['supplier_id' => $parameters['supplier_id']]);

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {

			return true;
	
		}

	}


}