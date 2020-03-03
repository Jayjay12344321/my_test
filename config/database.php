<?php 

	namespace config;

	class Database{


		static function getDatabase(){

			return new \medoo(
				/*[
					"database_type" => "mysql",
					"database_name"	=> "Cashier_Db",
					"server"	    => "localhost",
					"username"		=> "root",
					"password"		=> "",
					"charset"		=> "utf8",

				]*/
				[
					"database_type" => "mysql",
					"database_name"	=> "gon",
					"server"	    => "localhost",
					"username"		=> "root",
					"password"		=> "",
					"charset"		=> "utf8",

				]
			);

		}

		

	}