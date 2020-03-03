<?php

namespace Module\Models;

use Codes;
use Crypto;
use Tool;

class StudentModel extends Model {

	protected $schema = [];

	protected $database;
	protected $validator;

	public function __construct($database = null){
		
		if($database){
			
			$this->database = $database;

		} else {

			$this->database = \Container::get('database');

		}
			$this->validator  = \Container::get('validator');
			$this->MedooModel = new \Module\Models\MedooModel();

	}


	public function insertStudent($parameters){

		$result = $this->MedooModel->insert('student', $parameters);

		$getDbError = Model::dbError();

		if($getDbError[2] !== NULL){

			return false;

		} else {	

			return true;
	
		}

	}


	public function getAllStudents(){

		$result = $this->MedooModel->select('student', 0, "", 0);

		return $result;

	}

	public function getStudentById($parameters){

		$result = $this->MedooModel->get('student', 0, "", ['student_id' => $parameters['student_id']]);

		$getDbError = Model::dbError();


		if($getDbError[2] !== NULL){

			return false;

		} else {

			return $result;
	
		}


		

	}


}