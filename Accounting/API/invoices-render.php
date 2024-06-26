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
        fx.ID, 
        fx.Nr_Faktury AS invoiceNum, 
        fx.Data_wystawienia AS issueDate, 
        fx.Metoda_platnosci AS paymentMethod, 
        fx.Waluta AS currency, 
        fx.Cena_netto AS netPrice, 
        fx.Stawka_VAT AS VAT, 
        fx.ID_wystawiajacy AS issuerID, 
        fx.ID_podmiot AS clientID, 
        fx.Nazwa_towaru AS materialName, 
        fx.Ilość AS amount, 
        fx.Termin_platnosci AS dueDate, 
        fx.Typ_faktury AS invoiceType, 
        fx.`Miejsce_wystawienia` AS issuePlace,
        fx.Dostawa AS deliveryMethod,
        fx.Odbiorca AS reciver,
        fx.Płacący AS payer,
        fx.Sprzedający AS seller,
        fx.Jednostka_miary AS assjm,
        fx.Utworzony_przez AS issuedBy,
        fx.Odebrano AS recived,
        fx.Komentarze AS comments,
        fx.Zapłacono_dnia AS payDate
        FROM fx");

    // Wykonanie zapytania SQL
    $stmt->execute();

    // Pobranie wyników
    $invoices = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Zwrócenie wyników w formacie JSON
    echo json_encode($invoices);

} catch (PDOException $e) {
    // Obsługa błędów
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
