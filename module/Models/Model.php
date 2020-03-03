<?php

namespace Module\Models;

Class Model{

	protected $errors = [];
	protected $database;

	public function getErrors(){
		return $this->errors;
	}

	public function startTransaction(){
		return $this->database->pdo->beginTransaction();
	}

	public function rollBack(){
		return $this->database->pdo->rollBack();
	}

	public function commit(){
		return $this->database->pdo->commit();
	}

	public function dbError(){
		return $this->database->error();
	}
}