<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;

	class DiscountController{

		protected $c;

		public function __construct($c)
		{
			$this->c = $c;
			$this->validator = \Container::get('validator');
			$this->DiscountModel = new \Module\Models\DiscountModel();
			$this->DiscountHelper = new \Module\Helpers\DiscountHelper();

			
		}



		public function addDiscountOnProduct($req, $res, $arg){

			$parameters = $req->getParsedBody();

			$checkedFields = [
			 			"product_id" 					=> ["required|numeric"],
			 			"discount"						=> ["required"]
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


			$data = $this->DiscountModel->insertDiscountInProduct($parameters);


			if($data !== false){

				$message = Codes::get(1020);
				
				return $res->withJSON($message, 200);
		
			} else {

				$message = Codes::get(1006);
				return $res->withJSON($message, 400);	

			}




		}

		public function getDiscountsOnProductById($req, $res, $arg){


			$parameters['product_id'] = $arg['product_id'];

			$checkedFields = [

			 			"product_id" 				=> ["required|numeric"]

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



			$data = $this->DiscountModel->getDiscountByProductId($parameters);


			if($data !== false){

				return $res->withJSON(['data' => $data ], 200);
		
			} else {

				$message = Codes::get(1015);
				return $res->withJSON($message, 400);	

			}




		}


		public function deleteDiscount($req, $res, $arg){

			$parameters = $req->getParsedBody();

			$checkedFields = [

			 			"product_id" => ["optional|numeric"],
			 			"discount_id" => ["optional|numeric"]

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


			$data = $this->DiscountModel->removeDiscountData($parameters);


			if($data !== false){

				$message = Codes::get(1021);
				
				return $res->withJSON($message, 200);
		
			} else {

				$message = Codes::get(1006);
				return $res->withJSON($message, 400);	

			}

		}









    }