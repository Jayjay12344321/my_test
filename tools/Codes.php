<?php


Class Codes{

	//collection of response


	protected static $response = [
		"500"  => "Unknown Error",
		"1001" => "User already exist",
		"1002" => "All Fields are Required",
		"1003" => "The Url field is required",
		"1004" => "The Username field is required",
		"1005" => "Successfully Inserted",
		"1006" => "An Unexpected Error Occurred While Inserting",
		"1007" => "The Last Name field is required",
		"1008" => "The User Id field is required",
		"1009" => "User ID is not found",
		"1010" => "Username is already exist",
		"1011" => "Invalid Username Or Password. Please Try Again.",
		"1012" => "Unauthorized Actions",
		"1013" => "Supplier Successfully Added",
		"1014" => "The Supplier Id field is required",
		"1015" => "Supplier Does Not Exist",
		"1016" => "Supplier Successfully Updated",
		"1017" => "Student Successfully Added", 
		"1018" => "Product Does Not Exist",
		"1019" => "Product Successfully Updated",
		"1020" => "Discount Successfully Added",
		"1021" => "Discount Successfully Deleted",
		"1022" => "Product Type Successfully Added",
		"1023" => "Product Type Successfully Deleted",
		"1024" => "An Unexpected Error Occurred",
		"1025" => "The Password field is required",
		"1026" => "The Username field is required",
		"1027" => "The User Type field is required",
		"1028" => "Your Username/Password Does Not Match The Selected User Type",
		"1029" => "Successfully Added",
		"1030" => "Successfully Deleted",
		"1031" => "Successfully Updated",
		"1032" => "Transaction Successfully Created",
		"1033" => "Transaction Failed. Try Again."
	];

	public static function get($code)
	{
		foreach (self::$response as $key => $value) {
			
			if($key == $code){

				$result['code'] = $key;
				$result['message'] = $value;
				return $result;
				
			}
		}

	}
	public static function getCode($errors)
	{
		if(is_string($errors)){
			$errors = [$errors];
		}

		foreach($errors as $err_key => $err_value){

			$result['code'] = 500;
			$result['message'] = "Unknown Error";

			foreach (self::$response as $key => $value) {
				
				if(!isset($err_value['message'])){
					
					if($err_value == $value){
						$result['code'] = $key;
						$result['message'] = $value;
					}
				
				} else {

					foreach ($err_value as $error) {
									
						if($error == $value){
							$result['code'] = $key;
							$result['message'] = $value;
						}

					}

				}
				
			}	

			$results[] = $result;

				if($result['code'] == 500){

					$logger = \Container::get('logger');
					$err_value = is_array($err_value) ? json_encode($err_value) : $err_value;
 					$logger->info("Unknown Error : ". $err_value);
				}

		}

		return count($results) == 1 ? $results[0] : $results;

	}

	public static function getlang(){
				$headers = apache_request_headers();

				if(isset($headers['lang']) and $headers['lang']!=""){
					return $headers['lang'];
				}else{
					return 'en';
				}

			}

}