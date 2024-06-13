<?php
$servername = "localhost";
$database = "faktury";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //$_POST["rules"];
    $date = "2024-01-01";
    $hour = "14:00:00";
    $rules = "0";
    if (array_key_exists("rules", $_POST) && ($_POST["rules"] == "on")) {
        $rules = "1";
//        echo "1";
    }

    $stmt = $conn->prepare("INSERT INTO `fx`(`Nr_Faktury`, `Data_wystawienia`, `Metoda_platnosci`, `Waluta`, `Cena_netto`, `Stawka_VAT`, `ID_wystawiajacy`,`ID_podmiot`,`Nazwa_towaru`,`Ilość`,`Termin_platnosci`) VALUES (
        :invoiceNum,
        :issueDate,
        :issuePlace,
        :deliveryMethod,
        :reciver,
        :payer,
        :seller,
        :assName,
        :assQty,
        :assJm,
        :netPrice,
        :VAT,
        :issuedBy,
        :recived,
        :comments,
        :dueDate,
        :cash,
        :card,
        :bank,
        :payDate)");
    $stmt->bindValue(':kindOfTest', $_POST['eyetest_kind'], PDO::PARAM_STR);
    $stmt->bindValue(':place', $_POST['eyetest_localization'], PDO::PARAM_STR);
    $stmt->bindValue(':date', $date, PDO::PARAM_STR);
    $stmt->bindValue(':hour', $hour, PDO::PARAM_STR);
    $stmt->bindValue(':name', $_POST['name'], PDO::PARAM_STR);
    $stmt->bindValue(':surname', $_POST['surname'], PDO::PARAM_STR);
    $stmt->bindValue(':age', $_POST['age'], PDO::PARAM_STR);
    $stmt->bindValue(':eMail', $_POST['mail'], PDO::PARAM_STR);
    $stmt->bindValue(':phone', $_POST['number'], PDO::PARAM_STR);
    $stmt->bindValue(':message', $_POST['message'], PDO::PARAM_STR);
    $stmt->bindValue(':rules', $rules, PDO::PARAM_STR);
    $stmt->execute();

} catch (PDOException $e) {
//    echo "Connection failed: " . $e->getMessage();
}


echo "OK";
