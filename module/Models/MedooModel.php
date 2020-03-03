<?php

namespace Module\Models;

use Codes;

class MedooModel extends Model {

	protected $schema = [];

	protected $database;
	protected $validator;

	public function __construct($database = null){
		
		if($database){
			
			$this->database = $database;

		} else {

			$this->database = \Container::get('database');

		}
			$this->validator = \Container::get('validator');

	}


	public function insert($table_name, $data){

		$result = $this->database->insert($table_name, $data);
		return $result;

	}

	public function formatWhere($where){

	if(count($where) > 1){
		
		$temp = [];
        $temp['AND'] = $where;
       	$where = $temp;
	}

	return $where;

	}


	public function delete($table, $where){	

		
		$where = $this->formatWhere($where);

		if($where == 0){
			$where = [];
		}

		$result = $this->database->delete($table,$where);
		
		return $result;

	}



	public function update($table, $data, $where){	

		
		$where = $this->formatWhere($where);

		if($where == 0){
			$where = [];
		}

		$result = $this->database->update($table,$data,$where);
		
		return $result;

	}

	public function select( $table_name, $join, $column, $where){

		$where = $this->formatWhere($where);

		if($column == ""){

			$column = "*";

		}

		if($where == 0){
			$where = [];
		}	

		if($join != 0){

			$result = $this->database->select($table_name, $join, $column, $where);

		} else {

			$result = $this->database->select($table_name, $column, $where);
			
		}

		return $result;

	}


	public function get( $table_name, $join, $data,$where){

		$where = $this->formatWhere($where);

		if($data == ""){
			$data = "*";
		}

		if($where == 0){
			$where = [];
		}
			
		if($join != 0){

			$result = $this->database->get($table_name, $join, $data, $where);
			
		} else {
			$result = $this->database->get($table_name, $data, $where);
		

		}

		return $result;

	}



}