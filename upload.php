<?php
if(isset($_FILES['files'])){
  $req = false; // изначально переменная для "ответа" - false
  // Приведём полученную информацию в удобочитаемый вид
  ob_start();
  echo '<pre>';
  echo 'Данные загруженного файла:<br>';    
  print_r($_FILES['files']);
  echo '</pre>';
  $req = ob_get_contents();
  ob_end_clean();
  echo json_encode($req); // вернем полученное в ответе
  exit;
}