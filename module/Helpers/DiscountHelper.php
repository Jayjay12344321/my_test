<?php

namespace Module\Helpers;

use Tool;

Class DiscountHelper {

		protected $verification_key;
		protected $user_id;

        public function __construct(){
        	$this->MedooModel = new \Module\Models\MedooModel();
        }
}