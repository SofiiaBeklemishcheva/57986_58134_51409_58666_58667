<?php
$servername = "localhost";
$database = "faktury";
$username = "root";
$password = "";

try {
    // Tworzenie połączenia
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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

    // Mapowanie zmiennych POST na parametry SQL
    $stmt->bindParam(':invoiceNum', $_POST['invoiceNum'], PDO::PARAM_STR);
    $stmt->bindParam(':issueDate', $_POST['issueDate'], PDO::PARAM_STR);
    $stmt->bindParam(':paymentMethod', $_POST['paymentMethod'], PDO::PARAM_STR);
    $stmt->bindParam(':currency', $_POST['currency'], PDO::PARAM_STR);
    $stmt->bindParam(':netPrice', $_POST['netPrice'], PDO::PARAM_STR);
    $stmt->bindParam(':VAT', $_POST['VAT'], PDO::PARAM_STR);
    $stmt->bindParam(':issuerID', $_POST['issuerID'], PDO::PARAM_INT);
    $stmt->bindParam(':clientID', $_POST['clientID'], PDO::PARAM_INT);
    $stmt->bindParam(':materialName', $_POST['materialName'], PDO::PARAM_STR);
    $stmt->bindParam(':amount', $_POST['amount'], PDO::PARAM_STR);
    $stmt->bindParam(':dueDate', $_POST['dueDate'], PDO::PARAM_STR);
    $stmt->bindParam(':invoiceType', $_POST['invoiceType'], PDO::PARAM_STR);
    $stmt->bindParam(':issuePlace', $_POST['issuePlace'], PDO::PARAM_STR);
    $stmt->bindParam(':deliveryMethod', $_POST['deliveryMethod'], PDO::PARAM_STR);
    $stmt->bindParam(':reciver', $_POST['reciver'], PDO::PARAM_STR);
    $stmt->bindParam(':payer', $_POST['payer'], PDO::PARAM_STR);
    $stmt->bindParam(':seller', $_POST['seller'], PDO::PARAM_STR);
    $stmt->bindParam(':assJm', $_POST['assJm'], PDO::PARAM_STR);
    $stmt->bindParam(':issuedBy', $_POST['issuedBy'], PDO::PARAM_STR);
    $stmt->bindParam(':recived', $_POST['recived'], PDO::PARAM_STR);
    $stmt->bindParam(':comments', $_POST['comments'], PDO::PARAM_STR);
    $stmt->bindParam(':payDate', $_POST['payDate'], PDO::PARAM_STR);

    // Wykonanie zapytania
    $stmt->execute();

    echo "OK";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}