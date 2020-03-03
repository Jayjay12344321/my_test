<?php

namespace Module\Models;

use Codes;
use Crypto;
use Tool;

class ProductModel extends Model {

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


	public function addProduct($parameters){

		$result = $this->MedooModel->insert('product', $parameters);
		
		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {	

			return true;
	
		}

	}

	public function deleteProduct($parameters){

		$result = $this->MedooModel->delete('product', ['product_id' => $parameters['product_id']]);

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}

	}

	public function getProductById($parameters){

		$result = $this->MedooModel->get('product', 0, "", ['product_id' => $parameters['product_id']]);

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}

	}

	public function updateProduct($parameters){

		$result = $this->MedooModel->update('product', $parameters, ['product_id' => $parameters['product_id']]);

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {

			return true;
	
		}
	}

	public function productDetails(){

		$category = $this->MedooModel->select('category', 0, "", 0);

		$supplier = $this->MedooModel->select('supplier', 0, "", 0);

		$result = [];
		$result['category'] = $category;
		$result['supplier'] = $supplier;
		
		return $result;

	}

	public function productList(){

		$result = $this->MedooModel->select('product', 0, "", 0);
		
		return $result;

	}

}