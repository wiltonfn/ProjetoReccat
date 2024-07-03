<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once ('connection.php');

session_start();

if (isset($_GET['CPF'])) {
  $CPF = $_GET['CPF'];
}

$response = [];

if (isset($CPF)) {
  $stmt = mysqli_prepare($conn, 'SELECT * FROM solicitacao 
JOIN Cliente ON Cliente.cod = solicitacao.codigocliente WHERE CPF = ? ORDER BY solicitacao.codigosolicitacao DESC LIMIT 1');
  mysqli_stmt_bind_param($stmt, 's', $CPF);
  mysqli_stmt_execute($stmt);

  $result = mysqli_stmt_get_result($stmt);

  $solicitacoes = [];

  $solicitacoes[] = mysqli_fetch_assoc($result);

  if (!empty($solicitacoes)) {
    $response = $solicitacoes;
  }
}

mysqli_close($conn);

echo json_encode($response);

?>
