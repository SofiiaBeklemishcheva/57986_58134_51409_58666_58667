<?php
header('Content-Type: application/json');

$servername = "localhost";
$database = "faktury";
$username = "root";
$password = "root";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Pobranie danych JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true); // Dekodowanie JSON do tablicy asocjacyjnej

    // Przygotowanie zapytania SQL
    $stmt = $conn->prepare("INSERT INTO fx (
        Nr_Faktury, 
        Data_wystawienia, 
        Metoda_platnosci, 
        Waluta, 
        Cena_netto, 
        Stawka_VAT, 
        ID_wystawiajacy,
        ID_podmiot,
        Nazwa_towaru,
        Ilość,
        Termin_platnosci,
        Typ_faktury,
        Miejsce_wystawienia,
        Dostawa,
        Odbiorca,
        Płacący,
        Sprzedający,
        Jednostka_miary,
        Utworzony_przez,
        Odebrano,
        Komentarze,
        Zapłacono_dnia
    ) VALUES (
        :invoiceNum, 
        :issueDate, 
        :paymentMethod, 
        :currency, 
        :netPrice, 
        :VAT, 
        :issuerID,
        :clientID,
        :materialName,
        :amount,
        :dueDate,
        :invoiceType,
        :issuePlace,
        :deliveryMethod,
        :reciver,
        :payer,
        :seller,
        :assJm,
        :issuedBy,
        :recived,
        :comments,
        :payDate
    )");

    // Wiązanie wartości z otrzymanych danych JSON do zapytania SQL
    $stmt->bindValue(':invoiceNum', $data->invoiceNum, PDO::PARAM_STR);
    $stmt->bindValue(':issueDate', $data->issueDate, PDO::PARAM_STR);
    $stmt->bindValue(':paymentMethod', $data->paymentMethod, PDO::PARAM_STR);
    $stmt->bindValue(':currency', $data->currency, PDO::PARAM_STR);
    $stmt->bindValue(':netPrice', $data->netPrice, PDO::PARAM_STR);
    $stmt->bindValue(':VAT', $data->VAT, PDO::PARAM_STR);
    $stmt->bindValue(':issuerID', $data->issuerID, PDO::PARAM_INT);
    $stmt->bindValue(':clientID', $data->clientID, PDO::PARAM_INT);
    $stmt->bindValue(':materialName', $data->materialName, PDO::PARAM_STR);
    $stmt->bindValue(':amount', $data->amount, PDO::PARAM_STR);
    $stmt->bindValue(':dueDate', $data->dueDate, PDO::PARAM_STR);
    $stmt->bindValue(':invoiceType', $data->invoiceType, PDO::PARAM_STR);
    $stmt->bindValue(':issuePlace', $data->issuePlace, PDO::PARAM_STR);
    $stmt->bindValue(':deliveryMethod', $data->deliveryMethod, PDO::PARAM_STR);
    $stmt->bindValue(':reciver', $data->reciver, PDO::PARAM_STR);
    $stmt->bindValue(':payer', $data->payer, PDO::PARAM_STR);
    $stmt->bindValue(':seller', $data->seller, PDO::PARAM_STR);
    $stmt->bindValue(':assJm', $data->assJm, PDO::PARAM_STR);
    $stmt->bindValue(':issuedBy', $data->issuedBy, PDO::PARAM_STR);
    $stmt->bindValue(':recived', $data->recived, PDO::PARAM_STR);
    $stmt->bindValue(':comments', $data->comments, PDO::PARAM_STR);
    $stmt->bindValue(':payDate', $data->payDate, PDO::PARAM_STR);

    // Wykonanie zapytania SQL
    $stmt->execute();

    echo json_encode(["status" => "OK"]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}

