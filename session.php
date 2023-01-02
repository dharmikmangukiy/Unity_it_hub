<?php
	ini_set('session.gc_maxlifetime', 30*60);
	session_start();
	
	if(isset($_SESSION['CLIENT_LOGIN_STATUS']))
	{
		
	}
	else
	{
		echo "<script>window.location.href='login';</script>";
	}
?>