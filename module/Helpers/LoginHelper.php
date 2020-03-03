<?php

namespace Module\Helpers;

use Tool;

Class LoginHelper {

		protected $verification_key;
		protected $user_id;

        public function __construct(){
        	$this->MedooModel = new \Module\Models\MedooModel();
        }

        /*
		 * Method for generating authorization token for logged-in users
		 * This token is used for the 'AUTHORIZE' header
         */
        public function loggedInUser($currentUser){

        // Generate Verification Key
        $requestToken = Tool::generateToken();

        $this->verification_key = $requestToken;
        $this->user_id = $currentUser['user_id'];

        // Generate Authorization Token
        $authToken = Tool::generateJWS($currentUser, $requestToken);

        $response = [ "user_token" => $authToken ];

        // Add Verification Key On Database
        $this->MedooModel->update('users', ['verification_key' => $this->verification_key], ['user_id' => $this->user_id]);

        return $response;

        }       
}