<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;
	use Tool;

class StudentController{

	protected $c;

	public function __construct($c)
	{
		$this->c = $c;
		$this->validator = \Container::get('validator');
		$this->ProductHelper = new \Module\Helpers\ProductHelper();
		$this->StudentModel = new \Module\Models\StudentModel();
		$this->MedooModel = new \Module\Models\MedooModel();
		$this->database = \Container::get('database');
	}

	public function addStudent($req, $res, $arg){

		$parameters = $req->getParsedBody();

		$checkedFields = [
		 			"firstname" 	=> ["required"],
		 			"lastname" 		=> ["required"],
		 			"bod"			=> ["required"],
		 			"address" 		=> ["required"]
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

		$data = $this->StudentModel->insertStudent($parameters);


		if($data !== false){

			$message = Codes::get(1017);
			
			return $res->withJSON($message, 200);
	
		} else {

			$message = Codes::get(1006);
			return $res->withJSON($message, 400);	

		}

	}


	public function getAllStudent($req, $res, $arg){

		$data = $this->StudentModel->getAllStudents();
		$recordsTotal    = count($data);
		$recordsFiltered = count($data);

		return $res->withJSON(['data' => $data, 
							  'recordsTotal'    => $recordsTotal,
							  'recordsFiltered' => $recordsFiltered,
							  'draw' => 1
		                     ], 200);

	}

	public function getStudentById($req, $res, $arg){

		$parameters['student_id'] = $arg['student_id'];

		$checkedFields = [

		 			"student_id" => ["required|numeric"]

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


		$data = $this->StudentModel->getStudentById($parameters);


		if($data !== false){

			return $res->withJSON(['data' => $data ], 200);
	
		} else {

			$message = Codes::get(1015);
			return $res->withJSON($message, 400);	

		}

	}

	//view student using data table
	 public function view_using_data_table($req, $res, $arg){

       		$params = $req->getParsedBody();

       		//var_dump($parameters);exit;
       		
       		$columns = "";
       		$where = " WHERE 1  ";
       		
       		$select = "
       		   student.student_id,
		       student.firstname,
		       student.lastname,
		       student.bod,
		       student.address

		       ";
       		$query = " FROM student

       		   ".$where;

       		$where = " ";

       		$columns = [
	       		"student.student_id"
       		];

       		// $group = " GROUP BY discount_code ";
       		$group = "  ";

       		foreach ($params['b_filter'] as $key => $value){
       			if ($value != "" && $value != -1){
       				switch ($key) {
       					case 'firstname':
       						$where .= " AND student.firstname LIKE '%" . $value . "%' ";
       					break;
       					case 'lastname':
       						$where .= " AND student.lastname LIKE '%" . $value . "%' ";
       					break;
       				}
       			}
       		}

       		$result =  Tool::select($this->database, $select, $query, $where, $params, $columns,$arg,$group);
       		
       		return $res->withJSON($result, 200);			
       }



}