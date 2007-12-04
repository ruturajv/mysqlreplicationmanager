<?php
require_once "config.inc.php";
require "JSON.php";

if ( is_numeric($_POST['mlog_pos']) && ($_POST['fss'] != '') ) {
	
	$mysqli = new mysqli($server[$_POST['fss']]['slave_host'], $server[$_POST['fss']]['slave_username'], $server[$_POST['fss']]['slave_password'], '',
					$server[$_POST['fss']]['slave_port']);
	$mysqli->query("stop slave");
	$sql = "change master to master_log_file='{$_POST['ml']}', master_log_pos = {$_POST['mlog_pos']}";
	$mysqli->query($sql);
	echo $mysqli->error;
	$mysqli->query("start slave");
	echo $mysqli->error;
	$mysqli->close();

	exit;
}

if (($_POST['fss'] != 'NA') && isset($_POST['sc'])) {

	$mysqli = new mysqli($server[$_POST['fss']]['slave_host'], $server[$_POST['fss']]['slave_username'], $server[$_POST['fss']]['slave_password'], '',
					$server[$_POST['fss']]['slave_port']);
	if (mysqli_connect_errno()) {
		header("HTTP/1.x 503 Unable to connect");
		exit;
	}
	
	$sql = '';
	$bolQuery = false;
	switch ($_POST['sc']) {
		case 'ssi':
			$sql = "start slave io_thread";	
			$bolQuery = true;
			break;
		case 'sss':
			$sql = "start slave sql_thread";
			$bolQuery = true;
			break;
	}

	if ($bolQuery) {
		$mysqli->query($sql);
	}
	if ($mysqli->error) {
		header("HTTP/1.x 503 ". $mysqli->error);
		exit;
	}
	$mysqli->close();

}

if (($_POST['fss'] != 'NA') && isset($_POST['ssscontrol'])) {

	$mysqli = new mysqli($server[$_POST['fss']]['slave_host'], $server[$_POST['fss']]['slave_username'], $server[$_POST['fss']]['slave_password'], '',
					$server[$_POST['fss']]['slave_port']);
	if (mysqli_connect_errno()) {
		header("HTTP/1.x 503 Unable to connect");
		exit;
	}
	
	$sql = '';
	$bolQuery = false;
	switch ($_POST['ssscontrol']) {
		case 'start':
			$sql = "start slave";	
			$bolQuery = true;
			break;
		case 'stop':
			$sql = "stop slave";
			$bolQuery = true;
			break;
	}
	if ($bolQuery) {
		$mysqli->query($sql);
	}
	if ($mysqli->error) {
		header("HTTP/1.x 503 ". $mysqli->error);
		exit;
	}
	$mysqli->close();

}

?>
