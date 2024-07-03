<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once ('connection.php');

function clientAlreadyExists($conn, $newClientData)
{
  $stmt = mysqli_prepare($conn, 'SELECT * FROM Cliente WHERE Email = ? OR CPF = ? OR Celular = ?');
  mysqli_stmt_bind_param($stmt, 'sss', $newClientData['Email'], $newClientData['CPF'], $newClientData['Celular']);
  mysqli_stmt_execute($stmt);

  $result = mysqli_stmt_get_result($stmt);

  $clientAlreadyExists = mysqli_num_rows($result) > 0;
  return $clientAlreadyExists;
}

try {
  $cadastroBemSucedido = true;

  if (isset($connectionError)) {
    $cadastroBemSucedido = false;
  } else {
    $params = $_GET;
    $registerData = [
      'Nome' => $params['Nome'],
      'CPF' => $params['CPF'],
      'Email' => $params['Email'],
      'Celular' => $params['Celular'],
      'Endereco' => $params['Endereco'],
      'Bairro' => $params['Bairro'],
      'Numero' => (int) $params['Numero']
    ];

    if (clientAlreadyExists($conn, $registerData) || empty($registerData['CPF'])) {
      $cadastroBemSucedido = false;
    } else {
      extract($registerData);

      $stmt = mysqli_prepare($conn, 'INSERT INTO Cliente (Nome, CPF, Email, Celular, Endereco, Bairro, Numero) VALUES (?, ?, ?, ?, ?, ?, ?)');
      mysqli_stmt_bind_param($stmt, 'ssssssi', $Nome, $CPF, $Email, $Celular, $Endereco, $Bairro, $Numero);
      mysqli_stmt_execute($stmt);

      if (mysqli_stmt_error($stmt)) {
        $cadastroBemSucedido = false;
      }
    }
  }
} catch (Exception $e) {
  $cadastroBemSucedido = false;
}

mysqli_close($conn);

$response = [$cadastroBemSucedido ? 'certo' : 'erro'];
echo json_encode($response);

?>
