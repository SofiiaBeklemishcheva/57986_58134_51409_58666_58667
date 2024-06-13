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

    public function getVisitType($age)
    {
        try {
            $stmt = $this->conn->prepare("");
            $stmt->bindValue(':age', $age, PDO::PARAM_STR);
            $stmt->execute();
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        /* foreach($stmt->fetchAll() as $v) {
             echo $v;
         }*/
        print_r($result);
    }

    public function getLocalizationsWithType($type)
    {
        try {
            $stmt = $this->conn->prepare("");
            $stmt->bindValue(':type', $type, PDO::PARAM_STR);
            $results = $stmt->execute();
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
        return ($results);
    }



}