<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;

	class CurrencyController{

		protected $c;

		public function __construct($c)
		{
			$this->c = $c;
			$this->validator = \Container::get('validator');
			$this->currency_url = \Container::get('currency_url');
			$this->CurrencyServices = new \Module\Services\CurrencyServices();
			$this->CurrencyModel = new \Module\Models\CurrencyModel();

			
		}


		/*
		* Sample On How To Use Controller,
		* Model, Helper and Services
		*/

	    /**
	     * @SWG\POST(path="/book",
	     *   tags={"book"},
	     *   summary="Create Test",
	     *   description="This will just echo 'test'",
	     *   operationId="test",
	     *   produces={"application/json"},
	     *   @SWG\Parameter(
	     *     in="body",
	     *     name="body",
	     *     description="response test",
	     *     required=false,
	     *     @SWG\Schema(
		 *         @SWG\Property(
		 *             property="name",
		 *             type="string",
		 *             default="test"
		 *         ))
	     *   ),
	     *   @SWG\Response(
	     *     response=200,
	     *     description="successful operation"
	     *   )
	     * )
	     */

		public function scrapeCurrency($req, $res, $arg)
		{

			$parameters = $req->getParsedBody();

			$parameters['url'] = $this->currency_url;

			$checkedFields = [
			 			"url" => ["required"]		
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


			$result = $this->CurrencyServices->getAvailableCurrencies($parameters['url']);

			$data = $this->CurrencyModel->insertCurrencyData($result);


			if($data !== false){

				$message = Codes::get(1005);
				return $res->withJSON($message, 200);
		
			} else {

				$message = Codes::get(1006);
				return $res->withJSON($message, 400);

			}

			


		}




		public function getCurrencyList($req, $res, $arg){

			$data['Currencies'] = $this->CurrencyModel->getAllCurrency();
			return $res->withJSON($data, 200);
			

		}

		

	}