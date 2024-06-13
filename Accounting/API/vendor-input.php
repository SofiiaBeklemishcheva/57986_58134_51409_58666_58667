<?php
header('Content-Type: application/json');

$servername = "localhost";
$database = "faktury";
$username = "root";
$password = "root";

$json = file_get_contents('php://input');
$data = json_decode($json, true); // Dekodowanie JSON do tablicy asocjacyjnej

try {
    // Połączenie z bazą danych
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Przygotowanie zapytania SQL
    $stmt = $conn->prepare("INSERT INTO podmiot (Nazwa, NIP, Adres) 
                           VALUES (:name, :nip, :address)");

    // Wiązanie wartości z parametrami zapytania SQL
    $stmt->bindParam(':name', $data->name, PDO::PARAM_STR);
    $stmt->bindParam(':nip', $data->nip, PDO::PARAM_STR);
    $stmt->bindParam(':address', $data->address, PDO::PARAM_STR);

    // Wykonanie zapytania SQL
    $stmt->execute();

    // Zwrócenie potwierdzenia
    echo json_encode(["message" => "Vendor added successfully"]);

} catch (PDOException $e) {
    // Obsługa błędów
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}

