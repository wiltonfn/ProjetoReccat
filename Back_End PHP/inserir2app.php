<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('America/Sao_Paulo');
require_once('connection.php');

try {
    $solicitacaoBemSucedida = true;

    if (isset($connectionError)) {
        $solicitacaoBemSucedida = false;
    } else {
        $params = $_GET;
        $data = [
            'codigocliente' => (int) $params['codigocliente'],
            'tipomaterial' => $params['tipomaterial'],
            'quantidade' => $params['quantidade'],
            'descricao' => $params['descricao'],
            'retirada' => $params['retirada'],
            'data' => date("Y-m-d"),
            'status' => "Solicitado"
        ];

        extract($data);

        $stmt = mysqli_prepare($conn, 'INSERT INTO solicitacao (tipomaterial, quantidade, descricao, retirada, `data`, codigocliente, `status`) VALUES (?, ?, ?, ?, ?, ?, ?)');
        mysqli_stmt_bind_param($stmt, 'sssssis', $tipomaterial, $quantidade, $descricao, $retirada, $data, $codigocliente, $status);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_error($stmt)) {
            $solicitacaoBemSucedida = false;
        }
    }
} catch (Exception $e) {
    echo $e;
    $solicitacaoBemSucedida = false;
}

mysqli_close($conn);

$response = [$solicitacaoBemSucedida ? 'certo' : 'erro'];
echo json_encode($response);

?>