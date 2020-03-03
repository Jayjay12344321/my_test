<?php

namespace Module\Models;

use Codes;
use Crypto;
use Tool;


class LoginModel extends Model {

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


	

	public function checkUserCredentials($parameters){
		
		$user_details = $this->MedooModel->get("users", 0 , "", ["username" => $parameters['username']]); 
		$password = Crypto::encrypt($parameters['password']);

		$getCurrentDate = date('Y-m-d H:i:s');

		if($user_details['password'] !== $password){

			return false;

		} else {

			if($user_details['type_id'] != $parameters['user_type']){
				return "Invalid User Type";
			}

			$result = $this->MedooModel->update('users', ['last_action' => $getCurrentDate], ['user_id' => $user_details['user_id']]);

			return $user_details;
		}



	}


	public function logOutUser($parameters){

		$result = $this->MedooModel->update('user', ['verification_key' => ""], ['user_id' => $parameters['user_id']]);

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {

			return true;
	
		}

	}






}


?>