<?php

namespace Module\Helpers;

use Tool;
use Codes;

Class AuthenticationHelper{

    public function __construct(){

    }


    public function verifyUserAuthentication($loggedInUser, $grant_access = []){


    	if(!$loggedInUser || $loggedInUser['user_type'] === "" || !isset($loggedInUser['user_type'])){
    		
    		$message = Codes::get(1012);
    		return $message;

    	} else {

    		
    		$checkUserAccess = in_array($loggedInUser['user_type'], $grant_access);

            if($checkUserAccess == false){

                $message = Codes::get(1012);
                return $message;

            } else {

                return true;

            }


    	}


    }

}