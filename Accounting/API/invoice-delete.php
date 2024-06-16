<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$servername = "localhost";
$database = "faktury";
$username = "root";
$password = "dsaj31nhasd32!";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Pobranie danych JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true); // Dekodowanie JSON do tablicy asocjacyjnej

    // Przygotowanie zapytania SQL
    $stmt = $conn->prepare("DELETE FROM fx 
     WHERE ID = :ID");

    // Wiązanie wartości z otrzymanych danych JSON do zapytania SQL
    $stmt->bindValue(':ID', $data['ID'], PDO::PARAM_INT);


    // Wykonanie zapytania SQL
    $stmt->execute();

    echo json_encode(["status" => "OK"]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}