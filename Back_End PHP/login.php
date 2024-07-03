<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once ('connection.php');

session_start();

$CPF = $_GET['CPF'];

$loginBemSucedido = true;
$response = [];

if (isset($connectionError) || empty($CPF)) {
  $loginBemSucedido = false;
} else {
  $stmt = mysqli_prepare($conn, 'SELECT * FROM Cliente WHERE CPF = ?');
  mysqli_stmt_bind_param($stmt, 's', $CPF);
  mysqli_stmt_execute($stmt);

  $result = mysqli_stmt_get_result($stmt);
  $registerData = mysqli_fetch_assoc($result);

  if (!empty($registerData)) {
    $response[0] = $registerData;
    $_SESSION['CPF'] = $CPF;
    // header('location:inicial.php');
  } else {
    $loginBemSucedido = false;
    unset($_SESSION['CPF']);
    // header('location:erro.php');
  }
}

mysqli_close($conn);

echo json_encode($response);

?>