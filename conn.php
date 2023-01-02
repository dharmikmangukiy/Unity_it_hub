<?php

  $DB_host = "localhost";

  $DB_user = "alphapix_forex";
  $DB_pass = "Forex@321.";
  $DB_name = "alphapix_forex";


  
  $conn = new MySQLi($DB_host,$DB_user,$DB_pass,$DB_name);
    
  if($conn->connect_errno)
  {
      die("ERROR : -> ".$conn->connect_error);
  }
  date_default_timezone_set('Asia/Kolkata');


/* $_mt5_server_ip = "51.68.207.51";
$_mt5_server_port = "443";
$_mt5_server_login = "1006";
$_mt5_server_pwd = "API@12345";
$_mt5_server_version = "1985";
$_mt5_server_agent = "WebManager"; */



/* Life long live accout*/
$_mt5_server_ip = "51.68.207.51";
$_mt5_server_port = "443";
$_mt5_server_login = "1008";
$_mt5_server_pwd = "API@123456";
$_mt5_server_version = "1985";
$_mt5_server_agent = "WebManager";


/* $_mt5_server_ip = "173.249.60.175";
$_mt5_server_port = "443";
$_mt5_server_login = "1602";
$_mt5_server_pwd = "Khodiyar1989**";
$_mt5_server_version = "1985";
$_mt5_server_agent = "WebManager"; */
/* $_mt5_server_pwd = "Web@Api@123"; */

define("PROJECT_NAME","Life Long FX");
define("SITE_URL","https://alphapixclients.com/forex/");
define("SERVER_PATH",$_SERVER['DOCUMENT_ROOT'].'/forex/');
define("UPLOAD_DIR",'/forex/');

error_reporting(0);
/* error_reporting(E_ALL);
ini_set("display_errors",1);
ini_set("display_startup_errors",1); */
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
?>