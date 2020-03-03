<?php

namespace Module\Models;

use Codes;
use Tool;

class ProductTypeModel extends Model {

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

		public function insertProductTypeData($parameters){


			foreach ($parameters['product_type'] as $key => $value) {
					
				 $result = $this->MedooModel->insert('Product_Type', ['product_type' => $value]);


			}

			$getDbError = Model::dbError();

			if($getDbError[2] !== NULL){

				return false;

			} else {

				return $result;
		
			}

		}


		public function getAllProductTypes(){

			$result = $this->MedooModel->select('Product_Type', 0, "", 0);

			return $result;

		}


		public function removeProductTypeData($parameters){

		$result = $this->MedooModel->delete('Product_Type', ['product_type_id' => $parameters['product_type_id']]);

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}


		

	}


	}