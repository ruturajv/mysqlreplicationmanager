<?php
require_once "config.inc.php";
require "JSON.php";

if (($_POST['fss'] != 'NA') && isset($_POST['fss'])) {

	// Get slave details
	$mysqli = new mysqli($server[$_POST['fss']]['slave_host'], $server[$_POST['fss']]['slave_username'], $server[$_POST['fss']]['slave_password'], '',
					$server[$_POST['fss']]['slave_port']);
//    var_dump(mysqli_connect_errno());
	if (mysqli_connect_errno()) {
		header("HTTP/1.x 503 Unable to connect");
		exit;
	}
	$res = $mysqli->query("show slave status");
	if ($mysqli->error) {
		header("HTTP/1.x 503 ". $mysqli->error);
		exit;
	}
	$slave_status = $res->fetch_assoc();
	$mysqli->close();

	// get master logs
	$mysqli = new mysqli($server[$_POST['fss']]['master_host'], $server[$_POST['fss']]['master_username'], $server[$_POST['fss']]['master_password'], '',
					$server[$_POST['fss']]['master_port']);
	$res = $mysqli->query("show master logs");
	$master_logs = array();
	while($row = $res->fetch_assoc()) {
		$master_logs[] = $row['Log_name'];
	}
	$mysqli->close();

	$final = array( "slave" => $slave_status,
			'serverid' => $_POST['fss'],
			'master_logs' => $master_logs,
		   	);

	$json = new Services_JSON();
	header("Content-Type: text/plain");
	echo ($json->encode($final));
} else {
	header("HTTP/1.x 503 Data not available");
}

?>
