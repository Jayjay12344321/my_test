<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;
	use Tool;

class SupplierController{

	protected $c;

	public function __construct($c)
	{
		$this->c = $c;
		$this->validator     = \Container::get('validator');
		$this->ProductHelper = new \Module\Helpers\ProductHelper();
		$this->StudentModel  = new \Module\Models\StudentModel();
		$this->SupplierModel = new \Module\Models\SupplierModel();
		$this->MedooModel    = new \Module\Models\MedooModel();
		$this->database      = \Container::get('database');
	}

	public function addSupplier($req, $res, $arg){

		$parameters = $req->getParsedBody();

		$checkedFields = [
		 			"supplier_name" => ["optional"],
		 			"email"			=> ["optional"],
		 			"contact"       => ["optional"],
		 			"address" 		=> ["optional"]
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

		$data = $this->SupplierModel->addSupplier($parameters);


		if($data !== false){

			$message = Codes::get(1029);
			
			return $res->withJSON($message, 200);
	
		} else {

			$message = Codes::get(1006);
			return $res->withJSON($message, 400);	

		}

	}

	public function deleteSupplier($req, $res, $arg){

		$parameters['supplier_id'] = $arg['id'];

		$checkedFields = [

		 			"supplier_id" => ["required|numeric"],
		 			

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


		$data = $this->SupplierModel->deleteSupplier($parameters);


		if($data !== false){

			$message = Codes::get(1030);
			
			return $res->withJSON($message, 200);
	
		} else {

			$message = Codes::get(1024);
			return $res->withJSON($message, 400);	

		}

	}

	//view Supplier using data table
	 public function viewSupplier($req, $res, $arg){

       		$params = $req->getParsedBody();
       		
       		$columns = "";
       		$where = " WHERE 1  ";
       		
       		$select = "
       		   supplier.supplier_id,
       		   supplier.supplier_name,
       		   supplier.email,
       		   supplier.contact,
       		   supplier.address

		       ";
       		$query = " FROM supplier

       		   ".$where;

       		$where = " ";

       		$columns = [
	       		"supplier.supplier_id"
       		];

       		// $group = " GROUP BY discount_code ";
       		$group = "  ";

       		foreach ($params['b_filter'] as $key => $value){
       			if ($value != "" && $value != -1){
       				switch ($key) {
       					case 'firstname':
       						$where .= " AND supplier_id.supplier_name LIKE '%" . $value . "%' ";
       					break;
       				}
       			}
       		}

       		$result =  Tool::select($this->database, $select, $query, $where, $params, $columns,$arg,$group);
       		
       		return $res->withJSON($result, 200);			
       }

       public function getSupplierById($req, $res, $arg){

		$parameters['supplier_id'] = $arg['id'];

		$checkedFields = [

		 			"supplier_id" => ["required|numeric"]

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


		$data = $this->SupplierModel->getSupplierById($parameters);


		if($data !== false){

			return $res->withJSON(['data' => $data ], 200);
	
		} else {

			$message = Codes::get(1015);
			return $res->withJSON($message, 400);	

		}

	}

	public function updateSupplier($req, $res, $arg){


		$parameters = $req->getParsedBody();

		$checkedFields = [

		 			"supplier_id" 		=> ["optional"],
		 			"supplier_name" 	=> ["optional"],
		 			"email" 			=> ["optional"],
		 			"contact" 			=> ["optional"],
		 			"address" 			=> ["optional"],
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


		$data = $this->SupplierModel->updateSupplier($parameters);


		if($data !== false){

			$message = Codes::get(1031);
			return $res->withJSON($message, 200);	
	
		} else {

			$message = Codes::get(1024);
			return $res->withJSON($message, 400);	

		}

	}

}