<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;

class LoginController{

	protected $c;
	protected $logOut = true;
	protected $logOutMessage = 'logout';

	public function __construct($c)
	{
		$this->c = $c;
		$this->validator = \Container::get('validator');
		$this->LoginHelper = new \Module\Helpers\LoginHelper();
		$this->LoginModel = new \Module\Models\LoginModel();
		$this->MedooModel = new \Module\Models\MedooModel();
	}


	/*
	 * Method for User Log-out
	 *
	 */
	public function userLogOut($req, $res, $arg){

		$getCurrentUser = $req->getAttribute('user');
		$getVerificationToken = $req->getAttribute('token');

		$getDateNow = date('Y-m-d H:i:s');

		$checkLogOutStatus = $this->LoginModel->logOutUser($getCurrentUser); 

		if($checkLogOutStatus == false){

			$message = Codes::get(1006);
			return $res->withJSON($message, 400);

		} else {


			return $res->withJSON([$this->logOutMessage => $this->logOut], 200);
		}


	}

	/*
	 * Method for User Log-in
	 *
	 */
	public function userLogIn($req, $res, $arg){

		$parameters = $req->getParsedBody();

		$checkedFields = [
		
		 			"username" 		=> ["required"],
		 			"password" 		=> ["required"],
					"user_type"     => ["required"]
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


		$user_data = $this->LoginModel->checkUserCredentials($parameters); 

		if($user_data === "Invalid User Type"){
			$message = Codes::get(1028);
			return $res->withJSON($message, 400);
		}

		if($user_data == false){

			$message = Codes::get(1011);
			return $res->withJSON($message, 400);

		} else {

			$result = $this->LoginHelper->loggedInUser($user_data);
			return $res->withJSON($result, 200);


		}


		



	}


}