<?php

namespace Module\Models;

use Codes;

class CurrencyModel extends Model {

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

	public function getAllCurrency(){

		$now = date('Y-m-d');

		$result = $this->MedooModel->select('Exchange_Rate', 0, "code", ['last_updated[~]' => $now]);

		return $result;
		
	}


	public function insertCurrencyData($result){


		foreach ($result as $key => $value) {

			$value['last_updated'] = date('Y-m-d H:i:S');
			
			unset($value['name']);
			unset($value['usd']);

			$result = $this->MedooModel->insert('Exchange_Rate', $value);
			
		}
		
		$result_id = $this->database->id();

		if(!$result_id){

			return false;

		} else {

			return $result_id;

		}


	}


}