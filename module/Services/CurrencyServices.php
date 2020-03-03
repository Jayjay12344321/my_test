<?php 

namespace Module\Services;

class CurrencyServices {

	public function __construct(){

		$this->curl = new \Module\Helpers\Curl();
		$this->database = \Container::get('database');
		$this->validator = \Container::get('validator');

	}

	public function getAvailableCurrencies($params){

		$result = $this->curl->getCurrencyScrapedResult($params);
		return $result;

	}


}