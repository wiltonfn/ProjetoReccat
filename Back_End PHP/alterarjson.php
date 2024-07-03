<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once('connection.php');

try {
    $atualizacaoBemSucedida = true;

    if (isset($connectionError)) {
        $atualizacaoBemSucedida = false;
    } else {
        $params = $_GET;
        $data = [
            'CPF' => (int) $params['CPF'],
            'Nome' => $params['Nome'],
            'Email' => $params['Email'],
            'Celular' => (int) $params['Celular'],
            'Endereco' => $params['Endereco'],
            'Bairro' => $params['Bairro'],
            'Numero' => (int) $params['Numero']
        ];

        extract($data);

        $stmt = mysqli_prepare($conn, 'UPDATE cadastro SET Nome=?, CPF=?, Email=?, Celular=?, Endereco=?, Bairro=?, Numero=? WHERE CPF=?');
        mysqli_stmt_bind_param($stmt, 'sisissii', $Nome, $CPF, $Email, $Celular, $Endereco, $Bairro, $Numero, $CPF);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_error($stmt)) {
            $atualizacaoBemSucedida = false;
        }
    }
} catch (Exception $e) {
    $atualizacaoBemSucedida = false;
}

mysqli_close($conn);

$response = [$atualizacaoBemSucedida ? 'certo' : 'erro'];
echo json_encode($response);

?>