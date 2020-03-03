<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;
	use Tool;

class CustomerController{

	protected $c;

	public function __construct($c)
	{
		$this->c = $c;
		$this->validator     = \Container::get('validator');
		$this->ProductHelper = new \Module\Helpers\ProductHelper();
		$this->StudentModel  = new \Module\Models\StudentModel();
		$this->CustomerModel = new \Module\Models\CustomerModel();
		$this->MedooModel    = new \Module\Models\MedooModel();
		$this->database      = \Container::get('database');
	}

	public function addCustomer($req, $res, $arg){

		$parameters = $req->getParsedBody();

		$checkedFields = [
		 			"firstname" 	=> ["required"],
		 			"lastname" 		=> ["required"],
		 			"email"			=> ["required"],
		 			"phone_no"      => ["required"],
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

		$data = $this->CustomerModel->addCustomer($parameters);


		if($data !== false){

			$message = Codes::get(1029);
			
			return $res->withJSON($message, 200);
	
		} else {

			$message = Codes::get(1006);
			return $res->withJSON($message, 400);	

		}

	}

	public function deleteCustomer($req, $res, $arg){

		$parameters['customer_id'] = $arg['id'];

		$checkedFields = [

		 			"customer_id" => ["required|numeric"],
		 			

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


		$data = $this->CustomerModel->deleteCustomer($parameters);


		if($data !== false){

			$message = Codes::get(1030);
			
			return $res->withJSON($message, 200);
	
		} else {

			$message = Codes::get(1024);
			return $res->withJSON($message, 400);	

		}

	}

	//view customer using data table
	 public function viewCustomer($req, $res, $arg){

       		$params = $req->getParsedBody();
       		
       		$columns = "";
       		$where = " WHERE 1  ";
       		
       		$select = "
       		   customer.customer_id,
		       customer.firstname,
		       customer.lastname,
		       customer.email,
		       customer.phone_no,
		       customer.address

		       ";
       		$query = " FROM customer

       		   ".$where;

       		$where = " ";

       		$columns = [
	       		"customer.customer_id"
       		];

       		// $group = " GROUP BY discount_code ";
       		$group = "  ";

       		foreach ($params['b_filter'] as $key => $value){
       			if ($value != "" && $value != -1){
       				switch ($key) {
       					case 'firstname':
       						$where .= " AND customer.firstname LIKE '%" . $value . "%' ";
       					break;
       					case 'lastname':
       						$where .= " AND customer.lastname LIKE '%" . $value . "%' ";
       					break;
       				}
       			}
       		}

       		$result =  Tool::select($this->database, $select, $query, $where, $params, $columns,$arg,$group);
       		
       		return $res->withJSON($result, 200);			
       }

       public function getCustomerById($req, $res, $arg){

		$parameters['customer_id'] = $arg['id'];

		$checkedFields = [

		 			"customer_id" => ["required|numeric"]

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


		$data = $this->CustomerModel->getCustomerById($parameters);


		if($data !== false){

			return $res->withJSON(['data' => $data ], 200);
	
		} else {

			$message = Codes::get(1015);
			return $res->withJSON($message, 400);	

		}

	}

	public function updateCustomer($req, $res, $arg){


		$parameters = $req->getParsedBody();

		$checkedFields = [

		 			"customer_id" 		=> ["required"],
		 			"firstname" 		=> ["required"],
		 			"lastname" 			=> ["required"],
		 			"email" 			=> ["required"],
		 			"phone_no" 			=> ["required"],
		 			"address" 			=> ["required"],
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


		$data = $this->CustomerModel->updateCustomer($parameters);


		if($data !== false){

			$message = Codes::get(1031);
			return $res->withJSON($message, 200);	
	
		} else {

			$message = Codes::get(1024);
			return $res->withJSON($message, 400);	

		}

	}

}