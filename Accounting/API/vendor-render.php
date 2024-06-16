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
    // Połączenie z bazą danych
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Przygotowanie zapytania SQL
    $stmt = $conn->prepare("SELECT 
        podmiot.ID AS ID,
        podmiot.Nazwa AS name,
        podmiot.NIP AS NIP,
        podmiot.Adres AS address,
        podmiot.Telefon AS phone,
        podmiot.Komentarz AS comments
        FROM podmiot");

    // Wykonanie zapytania SQL
    $stmt->execute();

    // Pobranie wyników
    $vendors = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Zwrócenie wyników w formacie JSON
    echo json_encode($vendors);

} catch (PDOException $e) {
    // Obsługa błędów
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
