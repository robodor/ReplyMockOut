var HTMLCachedElements = {}

function getCachedHTMLElement(id)
{
	if (!(id in HTMLCachedElements))
	{
		console.log("caching " + id);
		// cache html elements and remove from original DOM,
		// otherwise duplicate element ids are generated
		
		HTMLCachedElements[id] = document.getElementById(id).innerHTML;
		
		var parentDiv = document.getElementById("webixContentDivs");
		var childDiv = document.getElementById(id);
		parentDiv.removeChild(childDiv);
	}
	
	return HTMLCachedElements[id];
}

function showHTML(id) {
	$$("htmlViewer").setHTML(getCachedHTMLElement(id));
	$$("htmlViewer").show();
	mainlayout.adjust();
}

htmlViewer = {
	id: "htmlViewer",
	view: "template",
	css:"main-panel",
	disabled:true,
	hidden:true,
	scroll:'y',
}