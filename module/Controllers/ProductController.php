<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;
	use Tool;

class ProductController{

	protected $c;

	public function __construct($c)
	{
		$this->c = $c;
		$this->validator = \Container::get('validator');
		$this->ProductHelper = new \Module\Helpers\ProductHelper();
		$this->ProductModel = new \Module\Models\ProductModel();
		$this->MedooModel = new \Module\Models\MedooModel();
		$this->database      = \Container::get('database');
	}

	public function addProduct($req, $res, $arg){

		$parameters = $req->getParsedBody();

		$checkedFields = [
		 			"product_code" 		=> ["optional"],
		 			"product_name" 		=> ["optional"],
		 			"description"		=> ["optional"],
		 			"quatity"      		=> ["optional"],
		 			"category_id" 		=> ["optional"],
		 			"supplier_price" 	=> ["optional"],
		 			"supplier_id" 		=> ["optional"]
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

		$data = $this->ProductModel->addProduct($parameters);


		if($data !== false){

			$message = Codes::get(1029);
			
			return $res->withJSON($message, 200);
	
		} else {

			$message = Codes::get(1006);
			return $res->withJSON($message, 400);	

		}

	}

	public function deleteProduct($req, $res, $arg){

		$parameters['product_id'] = $arg['id'];

		$checkedFields = [

		 			"product_id" => ["required|numeric"],
		 			

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


		$data = $this->ProductModel->deleteProduct($parameters);


		if($data !== false){

			$message = Codes::get(1030);
			
			return $res->withJSON($message, 200);
	
		} else {

			$message = Codes::get(1024);
			return $res->withJSON($message, 400);	

		}

	}

	//view customer using data table
	 public function viewProduct($req, $res, $arg){

       		$params = $req->getParsedBody();
       		
       		$columns = "";
       		$where = " WHERE 1  ";
       		
       		$select = "
       		   product.product_id,
       		   product.product_code,
       		   product.product_name,
       		   product.description,
       		   product.quatity,
       		   product.category_id,
       		   product.supplier_price,
       		   product.supplier_id,
       		   supplier.supplier_name,
       		   category.category_name

		       ";
       		$query = " FROM product
       			LEFT JOIN supplier ON supplier.supplier_id = product.supplier_id
       			LEFT JOIN category ON category.category_id = product.category_id

       		   ".$where;

       		$where = " ";

       		$columns = [
	       		"product.product_id"
       		];

       		// $group = " GROUP BY discount_code ";
       		$group = "  ";

       		foreach ($params['b_filter'] as $key => $value){
       			if ($value != "" && $value != -1){
       				switch ($key) {
       					case 'firstname':
       						$where .= " AND product.product_code LIKE '%" . $value . "%' ";
       					break;
       					case 'lastname':
       						$where .= " AND product.product_name LIKE '%" . $value . "%' ";
       					break;
       				}
       			}
       		}

       		$result =  Tool::select($this->database, $select, $query, $where, $params, $columns,$arg,$group);
       		
       		return $res->withJSON($result, 200);			
       }

       public function getProductById($req, $res, $arg){

		$parameters['product_id'] = $arg['id'];

		$checkedFields = [

		 			"product_id" => ["required|numeric"]

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


		$data = $this->ProductModel->getProductById($parameters);


		if($data !== false){

			return $res->withJSON(['data' => $data ], 200);
	
		} else {

			$message = Codes::get(1015);
			return $res->withJSON($message, 400);	

		}

	}

	public function updateProduct($req, $res, $arg){


		$parameters = $req->getParsedBody();

		$checkedFields = [

		 			"product_id" 		=> ["required"],
		 			"product_code" 		=> ["optional"],
		 			"product_name" 		=> ["optional"],
		 			"description" 		=> ["optional"],
		 			"quatity" 			=> ["optional"],
		 			"category_id" 		=> ["optional"],
		 			"supplier_price" 	=> ["optional"],
		 			"supplier_id" 		=> ["optional"],
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


		$data = $this->ProductModel->updateProduct($parameters);


		if($data !== false){

			$message = Codes::get(1031);
			return $res->withJSON($message, 200);	
	
		} else {

			$message = Codes::get(1024);
			return $res->withJSON($message, 400);	

		}

	}

	public function productDetails($req, $res, $arg){

		$data = $this->ProductModel->productDetails();
		return $res->withJSON(['data' => $data], 200);

	}

	public function productList($req, $res, $arg){

		$data = $this->ProductModel->productList();
		return $res->withJSON(['data' => $data], 200);

	}

}