<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;
	use Tool;

class SalesController{

	protected $c;

	public function __construct($c)
	{
		$this->c = $c;
		$this->validator = \Container::get('validator');
		$this->SalesModel = new \Module\Models\SalesModel();
		$this->MedooModel = new \Module\Models\MedooModel();
		$this->database      = \Container::get('database');
	}

	public function createTransaction($req, $res, $arg){

		$parameters = $req->getParsedBody();

		$checkedFields = [
		 			"items" 			=> ["optional"],
		 			"total_quantity" 	=> ["optional"],
		 			"markup"			=> ["optional"],
		 			"total_price"      	=> ["optional"],
		 			"selling_price" 	=> ["optional"],
		 			"comments"          => ["optional"]
				  ];


		$parameterError = null;

		$this->validator->setSanitize(false);

		$parameters = $this->validator->validateParameters($parameters, $checkedFields, $parameterError);
		
		$this->errors = $parameterError;


		if(!$parameters){

			if(isset($this->errors['message'])){
				
				$this->errors = $this->errors['message'];
			 	$message = Codes::getCode($this->errors);
			
			} else {

				$message = Codes::getCode($this->errors);

			}

			return $res->withJSON($message, 400);

		}

		$data = $this->SalesModel->createTransaction($parameters);


		if($data !== false){

			$message = Codes::get(1032);
			
			return $res->withJSON($message, 200);
	
		} else {

			$message = Codes::get(1033);
			return $res->withJSON($message, 400);	

		}

	}

}