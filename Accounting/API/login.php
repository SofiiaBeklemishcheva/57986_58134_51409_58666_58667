<?php


use API\ConnectionController;

require "ConnectionController.php";
$dataBaseConnection = new ConnectionController();

// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

$dataBaseConnection->login($data->login, $data->password);
