<?php
require_once "config.inc.php";
//require "JSON.php";

if (($_POST['ml'] != '') ) {

	$mysqli = new mysqli($server[$_POST['fss']]['master_host'], $server[$_POST['fss']]['master_username'], $server[$_POST['fss']]['master_password'], '',
					$server[$_POST['fss']]['master_port']);
	
	if (mysqli_connect_errno()) {
		header("HTTP/1.x 503 Unable to connect");
		exit;
	}

	if(is_numeric($_POST['mlog_pos'])) {
		$sql = "show binlog events in '{$_POST['ml']}' from {$_POST['mlog_pos']} limit 20";
	} else {
		$sql = "show binlog events in '{$_POST['ml']}' limit 20";
	}
	$res = $mysqli->query($sql);
	if ($mysqli->error) {
		header("HTTP/1.x 503 ". $mysqli->error);
		exit;
	}
	$log_events = array();
?>
<table width="100%" border="1">
<tr>
	<th>Position</th>
	<th>End<br/>Position</th>
	<th>Info</th>
</tr>
<?php
	if (!isset($_POST['lastindex'])) { 
		$firstindex = 0;
	} else {
		$firstindex = $_POST['lastindex'];
	}
	$bolgot = false;
	while ($row = $res->fetch_assoc()) {
		echo "<tr>";
		if (($firstindex != 0) && (!$bolgot)) {
			$firstindex = $row['Pos'];
			$bolgot = true;
		}
		echo "<td>{$row['Pos']}</td>";
		echo "<td>{$row['End_log_pos']}</td>";
		$lastindex = $row['End_log_pos'];
		echo "<td><div style='width:400px; overflow:auto;'>" . htmlspecialchars(substr($row['Info'], 0, 1000)) . "</div></td>";
		echo "</tr>\n";
	}
	$mysqli->close();


}
?>
</table>
<input type="hidden" name="lastindex" value="<?php echo $firstindex; ?>" />
<input type="hidden" name="newindex" value="<?php echo $lastindex; ?>" />
<a href="javascript:pageBinLog('previous');">&laquo; Previous</a>&nbsp;&nbsp;&nbsp;&nbsp;
<a href="javascript:pageBinLog('next');">Next &raquo;</a>
