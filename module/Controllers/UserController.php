<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;
	use Exception;

	use ElephantIO\Client;
	use ElephantIO\Engine\SocketIO\Version1X;

class UserController{

	protected $c;
	protected $Client = 'test';


	public function __construct($c)
	{
		$this->c = $c;
		$this->validator = \Container::get('validator');
		$this->UserModel = new \Module\Models\UserModel();
		$this->AuthenticationHelper = new \Module\Helpers\AuthenticationHelper();
		//$this->Client = \Container::get('Client');
	}

	

	public function registerUser($req, $res, $arg){
		
		
		$parameters = $req->getParsedBody();

		$checkedFields = [

		 			"first_name" 	=> ["required"],
		 			"last_name" 	=> ["required"],
		 			"username" 		=> ["required"],
		 			"password" 		=> ["required"]
					
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


		$data = $this->UserModel->insertUser($parameters);


		if($data !== false && isset($data['code']) != 1010){

			$message = Codes::get(1005);
			
			return $res->withJSON($message, 200);
	
		} else {

			if(isset($data['code']) == 1010){

				return $res->withJSON($data, 400);

			} else {
				
				$message = Codes::get(1006);
				return $res->withJSON($message, 400);

			}
			

		}

		
	}


	// Example With User Authentication

	public function findUserById($req, $res, $arg){

		$parameters['user_id'] = $arg['id'];

		$loggedInUser = $req->getAttribute('user');

		$grant_access = [
							"SU",
							"ACT"
						];

		$checkUser = $this->AuthenticationHelper->verifyUserAuthentication($loggedInUser, $grant_access);

		if($checkUser !== true){

			return $res->withJSON($checkUser, 401);

		}

		$checkedFields = [
		 			"user_id" 	=> ["required|numeric"]	
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

		$data = $this->UserModel->findUserByID($parameters['user_id']);


		if($data !== false){
	
			return $res->withJSON(['data' => $data], 200);
	
		} else {

			$message = Codes::get(1009);
			return $res->withJSON($message, 400);

		}


	}

	public function user_type($req, $res, $arg){

		$data = $this->UserModel->get_user_type();
		return $res->withJSON(['data' => $data], 200);

	}

	public function encrypt_password($req, $res, $arg){

		$client = new Client(new Version1X('http://localhost:3000'));
		$client->initialize();
		$client->emit('broadcast', ['foo' => 'bar']);
		$client->close();

		var_dump($client);exit;

		$str = $arg['data'];
		$data = Crypto::encrypt($str);
		return $res->withJSON(['data' => $data], 200);

	}

	public function decrypt_password($req, $res, $arg){

		$str = $arg['data'];
		$data = Crypto::decrypt($str);
		return $res->withJSON(['data' => $data], 200);

	}




}