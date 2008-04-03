<?php
require_once "config.inc.php";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>Replication Manager (Beta)</title>
<script type="text/javascript" src="js/y-utilities.js"></script>
<script type="text/javascript" src="js/replication-manager.js"></script>
<script type="text/javascript" src="js/3dparty.js"></script>
<link rel="stylesheet" type="text/css" media="screen" href="replication-manager.css" />
</head>
<body>
<h2>Replication Manager (Beta)</h2>
<h3 id="idslavename" style="display:inline;">&nbsp;</h3><span id="throb1" style="visibility:hidden;"><img src="throbber.gif" alt="loading..." / > Loading ...</span>

<div id="idmessage"></div>

<div style="clear:both;" id="idss">Slave Selector
<form style="display:inline;" name="ss">
<select name="fss" onchange="changeSlave();">
<option selected="selected" value="NA">Select Slave</option>
<?php
for ($i=0; $i<=$iss; $i++) {
	echo "<option value='$i'>{$server[$i]['slave_host']} - {$server[$i]['slave_name']}</option>";
}
?>
</select>
<input type="button" onclick="changeSlave()" value="Go" />
</form>
</div>
<table width="100%" border="0" cellpadding="10">
<tr>



<td width="50%" valign="top">
<div style="border: 1px solid #bb5454; padding: 5px;">
<form name="fssc">
<input type="hidden" id="idserverid" name="fss" value="NA" />
<input type="hidden" id="idservercommand" name="sc" value="" />
<input type="button" onclick="changeSlave();" value="Refresh" class="blue" />&nbsp;&nbsp;&nbsp;
<input type="button" onclick="startIO();" value="Start IO Thread" class="green" />&nbsp;&nbsp;&nbsp;
<input type="button" onclick="startSQL();" value="Start SQL Thread" class="green" />&nbsp;&nbsp;&nbsp;
</form>
<br/>
<b>Set Slave</b>
<form name="fcmt">
<input type="hidden" id="idserverids" name="fss" value="NA" />
<table border="1">
<tr>
<td>Master Log File</td>
<td><input type="text" name="ml" size="20"></td>
</tr>
<tr>
<td>Master Log Position</td>
<td><input type="text" name="mlog_pos" size="10"></td>
</tr>
</table>
<input type="button" name="bss" value="Set Slave" class="red" onClick="setSlave()" title="Will Stop slave, set and start !"/>
</form>

<br/>

<form name="fsss">
<input type="hidden" id="idsssid" name="fss" value="" />
<input type="hidden" id="idssscontrol" name="ssscontrol" value="" />
<input type="button" value="Stop slave" class="red" onclick="controlSlave('stop')" />
&nbsp;&nbsp;&nbsp;&nbsp;
<input type="button" value="Start slave" class="green" onclick="controlSlave('start')" />
</form>
</div>

<br/>
<b>Slave Status</b>
<table width="100%" border="1">
<tr>
	<td width="25%">Master</td>
	<td id="idmaster" width="75%"></td>
</tr>
<tr>
	<td>Slave IO</td>
	<td id="idslaveIO"></td>
</tr>
<tr>
	<td>Slave SQL</td>
	<td id="idslaveSQL"></td>
</tr>
<tr>
	<td>Master Log File</td>
	<td id="idmasterlogfile"></td>
</tr>
<tr>
	<td>Relay Log File</td>
	<td id="idrelaymlogfile"></td>
</tr>
<tr>
	<td>Exec Master Log Pos</td>
	<td id="idexecmasterlogpos"></td>
</tr>
<tr>
	<td>Last Error</td>
	<td id="idlasterror"></td>
</tr>
<tr>
	<td>Replicated Tables</td>
	<td id="idreplicatedtables"></td>
</tr>
</table>
</td>



<td width="50%" valign="top">
<form name="fml" style="display:inline;">
<input type="hidden" id="idserveridm" name="fss" value="NA" />
<b>Master Logs</b>
<select name="ml" id="idmasterlogs">
<option value="NA">Select Master Log</option>
</select>
<b>Pos.</b> <input type="text" name="mlog_pos" size="10" />
<input name="go" type="button" value="Go" onClick="getBinLogEvents()" />
<br style="clear:both;" />
<br style="clear:both;" />
<div id="idmasterlogstable" style="border-top:10px;"></div>
</form>
</td>



</table>
<div id="throb2" style="visibility:hidden;"><img src="throbber.gif" alt="loading..." / > Loading ...</div>
</body>
</html>
