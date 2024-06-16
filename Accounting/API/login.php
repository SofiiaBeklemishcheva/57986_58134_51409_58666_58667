<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

use API\ConnectionController;

require "ConnectionController.php";
$dataBaseConnection = new ConnectionController();

// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

$dataBaseConnection->login($data->login, $data->password);
