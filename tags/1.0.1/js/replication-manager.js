var idmaster, idslaveIO, idslaveSQL, idmasterlogfile, idrelaylogfile, idexecmasterlogpos, idlasterror, idserverid, idservercommand, idmasterlogs, idserveridm, idserverids, idsssid, idssscontrol, idmessage, idreplicatedtables, lastserverid;

YAHOO.util.Event.addListener(window, "load", function(){
	// all slave status ids
	idslavename = $('idslavename');
	idmaster = $('idmaster');
	idslaveIO = $('idslaveIO');
	idslaveSQL = $('idslaveSQL');
	idmasterlogfile = $('idmasterlogfile');
	idrelaymlogfile = $('idrelaymlogfile');
	idexecmasterlogpos = $('idexecmasterlogpos');
	idlasterror = $('idlasterror');
	idserverid = $('idserverid');
	idservercommand = $('idservercommand');
	idmasterlogs = $('idmasterlogs');
	idserveridm = $('idserveridm');
	idserverids = $('idserverids');
	idsssid = $('idsssid');
	idssscontrol = $('idssscontrol');
	idmessage = $('idmessage');
	idreplicatedtables = $('idreplicatedtables');
	}
);

function changeSlave() {

	throb(true);
	var oCS = {
		success: function(o) {
//                     console.debug(o);
					 messageDelivery();
					data = o.responseText.parseJSON();
					idmaster.innerHTML = data['slave']['Master_Host'];

					sss = "<div style='background-color:red; color: white; font-weight: bold;'>No</div>";
					ssr = "<div style='background-color:green; color: white; font-weight: normal;'>Yes</div>";

					if (data['slave']['Slave_IO_Running'] == 'Yes') {
						io = ssr;
					} else {
						io = sss;
					}
					idslaveIO.innerHTML = io;
					if (data['slave']['Slave_SQL_Running'] == 'Yes') {
						sql = ssr;
					} else {
						sql = sss;
					}
					idslaveSQL.innerHTML = sql;
					idmasterlogfile.innerHTML = data['slave']['Master_Log_File'];
					idrelaymlogfile.innerHTML = data['slave']['Relay_Master_Log_File'];
					idexecmasterlogpos.innerHTML = data['slave']['Exec_Master_Log_Pos'];
					idlasterror.innerHTML = data['slave']['Last_Error'];

					aReplTables = data['slave']['Replicate_Do_Table'].split(',');
					strReplTables = '';
					for (i=0; i<aReplTables.length; i++) {
						strReplTables += aReplTables[i] + '<br/>';
					}
					idreplicatedtables.innerHTML = strReplTables;
					idserverid.value = data['serverid'];
					idserveridm.value = data['serverid'];
					idserverids.value = data['serverid'];

					idmasterlogs.options.length=0;
					for(i=0; i<data['master_logs'].length; i++) {
						oo = document.createElement("option");
						oo.value = data['master_logs'][i];
						oo.text = data['master_logs'][i];
						idmasterlogs.appendChild(oo);
						if( data['master_logs'][i] == data['slave']['Relay_Master_Log_File'] ) {
							oo.selected = true;
						}
					}
					document.forms['fml'].elements['mlog_pos'].value = data['slave']['Exec_Master_Log_Pos'];

					document.forms['fcmt'].elements['ml'].value = data['slave']['Relay_Master_Log_File'];
					document.forms['fcmt'].elements['mlog_pos'].value = data['slave']['Exec_Master_Log_Pos'];

					if (lastserverid != $("idserverid").value) {
						$("idmasterlogstable").innerHTML = '';
					}
					lastserverid = $("idserverid").value;
					throb(false);
				 },
				failure: function(o) {
					messageDelivery(o);
					throb(false);
					window.scroll(0,0);
					console.debug(o);
				 }
	}

	idslavename.innerHTML = document.forms['ss'].elements['fss'][document.forms['ss'].elements['fss'].selectedIndex].text;
	YAHOO.util.Connect.setForm(document.forms['ss']);
	cObj = YAHOO.util.Connect.asyncRequest('POST', 'getSlaveDetails.php', oCS); 

}

function startIO() {
	throb(true);
	// set the command
	idservercommand.value = "ssi";

	var oCS = {
		success: function(o) {
					messageDelivery();
					changeSlave();
					throb(false);
				 },
		failure: function(o) {
					messageDelivery(o);
					throb(false);
					window.scroll(0,0);
					console.debug(o);
				 }
	}

	YAHOO.util.Connect.setForm(document.forms['fssc']);
	cObj = YAHOO.util.Connect.asyncRequest('POST', 'setSlave.php', oCS); 
}

function startSQL() {
	throb(true);
	// set the command
	idservercommand.value = "sss";

	var oCS = {
		success: function(o) {
					messageDelivery();
					changeSlave();
					throb(false);
//                     console.debug(o.responseText);
				 },
		failure: function(o) {
					messageDelivery(o);
					throb(false);
					window.scroll(0,0);
					console.debug(o);
				 }
	}

	YAHOO.util.Connect.setForm(document.forms['fssc']);
	cObj = YAHOO.util.Connect.asyncRequest('POST', 'setSlave.php', oCS); 
}

function getBinLogEvents() {
	throb(true);
	var oCS = {
		success: function(o) {
					messageDelivery();
					 $("idmasterlogstable").innerHTML = o.responseText;
					throb(false);
//                     console.debug(o.responseText);
				 },
		failure: function(o) {
					messageDelivery(o);
					throb(false);
					window.scroll(0,0);
//                    console.debug(o);
				 }
	}

	YAHOO.util.Connect.setForm(document.forms['fml']);
	cObj = YAHOO.util.Connect.asyncRequest('POST', 'getBinLogEvents.php', oCS); 
}

function setSlave() {
	if (confirm("Are u sure u wan't to set the slave ?")) {
		throb(true);
		var oCS = {
			success: function(o) {
						 messageDelivery();
						changeSlave();
						throb(false);
	//                     console.debug(o.responseText);
					 },
			failure: function(o) {
						messageDelivery(o);
						changeSlave();
						throb(false);
						window.scroll(0,0);
	//                    console.debug(o);
					 }
		}

		YAHOO.util.Connect.setForm(document.forms['fcmt']);
		cObj = YAHOO.util.Connect.asyncRequest('POST', 'setSlave.php', oCS);
	}
}

function controlSlave(ctrl) {
	var control;
	switch (ctrl) {
		case 'stop':
			control = ctrl;
			break;
		case 'start':
			control = ctrl;
			break;
	}
	if (confirm("Are u sure u wan't to "+control+" the slave ?")) {
		throb(true);
		var oCS = {
			success: function(o) {
						messageDelivery();
						changeSlave();
						throb(false);
	//                     console.debug(o.responseText);
					 },
			failure: function(o) {
						messageDelivery(o);
						changeslave();
						throb(false);
						window.scroll(0,0);
	//                    console.debug(o);
					 }
		}

		f = document.forms;
		f['fsss'].elements['idsssid'].value = f['fssc'].elements['idserverid'].value;
		idssscontrol.value = control;
		YAHOO.util.Connect.setForm(f['fsss']);
		cObj = YAHOO.util.Connect.asyncRequest('POST', 'setSlave.php', oCS);
	}
}

function throb(bool) {
	t1 = $('throb1');
	t2 = $('throb2');
	if (bool) {
		t1.style.visibility = "visible";
		t2.style.visibility = "visible";
	} else if (!bool) {
		t1.style.visibility = "hidden";
		t2.style.visibility = "hidden";
	}
}

function pageBinLog(type) {
	fe = document.forms['fml'].elements;
	if(type == 'next') {
		fe['mlog_pos'].value = fe['newindex'].value;
//        console.debug(fe['newindex'].value);
		fe['go'].click();
	} else if (type == 'previous') {
		fe['mlog_pos'].value = fe['lastindex'].value;
//        console.debug(fe['lastindex'].value);
		fe['go'].click();
	}
}

function messageDelivery() {
	if (arguments.length == 1) {
		idmessage.innerHTML = arguments[0].statusText;
		idmessage.style.display = 'block';
	} else {
		idmessage.innerHTML = '';
		idmessage.style.display = 'none';
	}
}
