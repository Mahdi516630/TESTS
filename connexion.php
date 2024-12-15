<?php
$host = 'localhost';
$dbname = 'user';
$username = 'root';
$password = ''; // Par défaut, il n'y a pas de mot de passe sous Wamp.

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}
?>
