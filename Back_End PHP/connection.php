<?php

$host = 'localhost';
$dbname = 'reccat';
$password = '';
$username = 'root';

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
  $connectionError = mysqli_connect_error();
}

?>