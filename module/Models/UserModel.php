<?php

namespace Module\Models;

use Codes;
use Crypto;

class UserModel extends Model {

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


	// Example Of Using Transactions In Inserting To Database

	public function insertUser($parameters){
		
		Model::startTransaction();

		$user_parameters['username'] = $parameters['username'];
		$user_parameters['password'] = Crypto::encrypt($parameters['password']);
		 							
		$user_data = $this->MedooModel->insert('user', $user_parameters);
		$int_user_id = $this->database->id();

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			Model::rollBack();

			if(strpos($getDbError[2], 'Duplicate entry') !== false){

				$message = Codes::get(1010);
				return $message;

			} else {

				return false;
			}
				

		} else {

			Model::commit();

			$userinfo_parameters = [];

			$userinfo_parameters['first_name'] = $parameters['first_name'];
			$userinfo_parameters['last_name'] = $parameters['last_name'];
			$userinfo_parameters['user_id'] = $int_user_id;

			$result = $this->addUserInformationDetails($userinfo_parameters);

			return $result;

		}


	}


	public function addUserInformationDetails($parameters){


		$result = $this->MedooModel->insert('user_info', $parameters);
		$result_id = $this->database->id();

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {

			return true;
	
		}

	}


	public function findUserByID($int_UserId){

		$result = $this->MedooModel->select('user', ["[>]user_information" => 'user_id'], "", ["user_id" => $int_UserId]);

		if(!$result){

			return false;

		} else {
			
			return $result;

		}


	}

	public function get_user_type(){

		$result = $this->MedooModel->select('user_type', 0, "", 0);
		
		return $result;

	}



}