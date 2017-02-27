function iotUpdateData(data)
{
	if (!data)
	{
		// no IoT in project
		$$('sidemenu').remove('iot');
		document.getElementById("iotHomeCard").style.display = 'none'; 
		return;
	}
	
	document.getElementById("fb_board_name").value   = data['iotBoardName'];
    document.getElementById("fb_board_config").value = JSON.stringify(data['iotBoardConfig']);
}
