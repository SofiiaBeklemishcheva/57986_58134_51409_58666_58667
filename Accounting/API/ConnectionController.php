<?php

namespace API;

use PDO;
use PDOException;

class ConnectionController
{
    private $conn;

    public function __construct()
    {
        $servername = "localhost";
        $database = "faktury";
        $username = "root";
        $password = "root";

        try {
            $this->conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);

            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function login($login, $password)
    {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM user WHERE UserName = :login AND Password = :password");
            $stmt->bindValue(':login', $login, PDO::PARAM_STR);
            $stmt->bindValue(':password', $password, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
        if (count($stmt->fetchAll())===1){
            echo json_encode(["status" => "OK"]);
        }
        else{
            echo json_encode(["status" => ":("]);
        }
    }


}