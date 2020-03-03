<?php 

	namespace Module\Controllers;
	use Codes;
	use Crypto;
	use Tool;

class DashboardController{

	protected $c;

	public function __construct($c)
	{
		$this->c = $c;
		$this->validator = \Container::get('validator');
		$this->DashboardModel = new \Module\Models\DashboardModel();
		$this->MedooModel = new \Module\Models\MedooModel();
		$this->database      = \Container::get('database');
	}

	public function dashboardDetails($req, $res, $arg){

		$data = $this->DashboardModel->dashboardDetails();
		return $res->withJSON(['data' => $data], 200);

	}

	public function DashboardList($req, $res, $arg){

		$data = $this->DashboardModel->DashboardList();
		return $res->withJSON(['data' => $data], 200);

	}

}