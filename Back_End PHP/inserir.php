<?php
        include 'verifica.php';

        include 'conexao.php';
        include 'menu.php';

        $codigocliente=$_POST['codigocliente'];
        $tipomaterial=$_POST['tipomaterial'];
        $quantidade=$_POST['quantidade'];
        $descricao=$_POST['descricao'];
		$retirada=$_POST['retirada'];
		$data=$_POST['data'];
		$status=$_POST['status'];
        
        $sql = "INSERT INTO solicitacao(tipomaterial, quantidade, descricao, retirada, data, status, codigocliente)VALUES ('$tipomaterial', '$quantidade', '$descricao', '$retirada', '$data', '$status', '$codigocliente')";
        
        echo"<center>";
        
        if (mysqli_query($con, $sql)) {
          echo "Registro inserido com sucesso!<br><br>";
        } else {
          echo "Error: " . $sql . "<br>" . mysqli_error($con);
        }
        
        $ultimoCodigo = $con->insert_id;
        
        
        //UPLOAD DA IMAGEM
        
        $endereco = "uploads/";
        
        $target_path = $endereco . basename( $_FILES['uploadedfile']['name']); 
        
        $novoNome='foto'.$ultimoCodigo.'.jpg';
        
        if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $endereco.$novoNome)) {
            echo "<br>Arquivo<b> ".  $endereco.$novoNome. 
            " </b>enviado com sucesso";
        } else{
            echo "<br>A imagem não foi enviada.";
        }
        
        echo"</center>";
        ?>