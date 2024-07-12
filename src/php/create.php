<?php
include_once 'Database.php';
include_once 'RegistroTrocasHidrometros.php';

$database = new Database();
$db = $database->getConnection();

$registro = new RegistroTrocasHidrometros($db);



// Recebe os dados do formulário
$registro->os = $_POST['os'];
$registro->codigo = $_POST['codigo'];



// Verifica se os arquivos foram enviados e processa as imagens
$registro->testada = isset($_FILES['testada']) ? file_get_contents($_FILES['testada']['tmp_name']) : null;
$registro->hretirado = isset($_FILES['hretirado']) ? file_get_contents($_FILES['hretirado']['tmp_name']) : null;
$registro->hnovo = isset($_FILES['hnovo']) ? file_get_contents($_FILES['hnovo']['tmp_name']) : null;
$registro->cavalete = isset($_FILES['cavalete']) ? file_get_contents($_FILES['cavalete']['tmp_name']) : null;



// Insere o registro no banco de dados
if ($registro->create()) {
    echo "Registro criado com sucesso.";
} else {
    echo "Não foi possível criar o registro.";
}
?>
