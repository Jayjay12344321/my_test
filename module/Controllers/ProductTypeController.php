<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;

	class ProductTypeController{

		protected $c;

		public function __construct($c)
		{
			$this->c = $c;
			$this->validator = \Container::get('validator');
			$this->ProductTypeModel = new \Module\Models\ProductTypeModel();
		}


		public function addProductType($req, $res, $arg){

			$parameters = $req->getParsedBody();

			$checkedFields = [
			 			"product_type" 					=> ["required"]
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


			$data = $this->ProductTypeModel->insertProductTypeData($parameters);

			if($data !== false){

				$message = Codes::get(1020);
				
				return $res->withJSON($message, 200);
		
			} else {

				$message = Codes::get(1006);
				return $res->withJSON($message, 400);	

			}


		}


		public function getAllProdutType($req, $res, $arg){

			$data = $this->ProductTypeModel->getAllProductTypes();
			return $res->withJSON(['data' => $data], 200);
		}


		public function deleteProductType($req, $res, $arg){

			$parameters['product_type_id'] = $arg['id'];

			$checkedFields = [

			 			"product_type_id" => ["required|numeric"],
			 			

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


			$data = $this->ProductTypeModel->removeProductTypeData($parameters);


			if($data !== false){

				$message = Codes::get(1023);
				
				return $res->withJSON($message, 200);
		
			} else {

				$message = Codes::get(1024);
				return $res->withJSON($message, 400);	

			}

		}


	}