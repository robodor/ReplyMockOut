showBuild = function(){
	$$("listBuild").show();
	$$("buildViewer").show();
	mainlayout.adjust();
	
	svgPanZoom('#buildImage', {
	  	fit: true,
	  	enter: true,
	  	controlIconsEnabled: true,
	  });
	return;
	document.getElementById('buildImage').addEventListener('load', function(){
	  svgPanZoom(document.getElementById('buildImage'), {
	  	fit: true,
	  	enter: true,
	  	controlIconsEnabled: true,
	  }); 
	})
};

function buildUpdateData(data) {
	$$('buildTree').parse(data['steps']);
	
	$$('buildViewer').setHTML('<svg id="buildImage" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%">' + data['img'] + '</svg>');
}

var elementWithStroke = '';
var listBuild = {
	id:"listBuild",
	width:450,
	rows: [
		{
	        view: "button",
	        type: "icon",
	        label: "overview",
	        icon:"info",
	        on: {
	            'onItemClick' : function() {$$("buildTree").setActiveIndex(1);}
	        }
	    },
		{
			id:"buildTree",
			view:"list",
			css:'listCardItem',
			template: function(obj, common)
			{
				var res ='<div class ="listCardItem">';
				
				if (obj.index)
					res += '<span class="listNum">' + obj.index + '</span>';
				else
					res += '<span class="listSpace"></span>';
				
				res += '<img src="' + obj.img + '" style="margin:0 4px;" height=40>' + '<span class ="stepAction">' + obj.action + '</span>';
				
				// if (obj.info && !obj.test)
				// 	res += '<span class="webix_icon fa-info" style="float:right; color:#FF6B6B"></span>' ;
				
				if (obj.info)
					res += '<br><span class="listInfo card card-2">' + obj.info + '</span>';
				
				res += "</div>";
				
				return res;
			},
			
			type: { 
    			height: "auto"
			},
			select:true,
			on:{
				'onAfterLoad': function() {
					this.select(this.getIdByIndex(0));
				},
				'onSelectChange': function() {
					var selected = this.getSelectedId();
					var i = 0;
					var id;
					var afterSelect = false;
					
					this.showItem(selected);
					
					while (id = this.getIdByIndex(i))
					{
						var svgid = this.getItem(id).id;
						var element = document.getElementById(svgid);
						
						if (id == selected)
						{
							this.removeCss(id, "buildItemDisabled");
							afterSelect = true;
							
							if (element)
								element.style.visibility = 'visible';
							
							setStrokedId(svgid);
						}
						else if (selected == "overview")
						{
							this.removeCss(id, "buildItemDisabled");
							
							if (element)
								element.style.visibility = 'visible';
						}
						else if (afterSelect || (selected == "overview"))
						{
							this.removeCss(id, "buildItemDisabled");
							
							if (element)
								element.style.visibility = 'hidden';
						}
						else
						{
							this.addCss(id, "buildItemDisabled");
							
							if (element)
								element.style.visibility = 'visible';
						}
							
						i++;
					}
					
				},
			},

		},
		{
			view:"template",
			id:"buildInfo",
			css:"buildInfoStyle",
			autoheight: true,
			hidden:true,
		},
		{
			view: "toolbar", 
			height:60, 
			elements: [
				{
					view: "button",
					id:"prevButton",
					css: "prevButton",
					label: "Previous Step",
					type: "iconButtonTop",
					icon: "caret-left",
					click: buildPrevStep
				},
				{
					view: "button",
					css:"nextButton",
					label: "Next Step",
					type: "iconButtonTop",
					icon: "caret-right",
					click: buildNextStep,
					width: 300,
				},
			]
		},
		{view: "button", type: "icon", label: "help", icon:"question-circle"},
		{view: "button", type: "icon", label: "bug", icon:"bug"},
	]
};

function buildOverview() {
	var i = 0;
	var id;
	var buildTree = $$('buildTree');

	while (id = buildTree.getIdByIndex(i))
	{
		var svgid = buildTree.getItem(id).id;
		var element = document.getElementById(svgid);
		
		this.removeCss(id, "buildItemDisabled");
			
		if (element)
			element.style.visibility = 'visible';

		i++;
	}
}

function buildNextStep() {
	buildChangeStep(1);
}

function buildPrevStep() {
	buildChangeStep(-1);
}

function buildChangeStep(diff)
{
	var buildTree = $$('buildTree');
	
	var buildStepId = buildTree.getSelectedId();
	
	if (buildStepId == "")
	{
		var newId = buildTree.getIdByIndex(0);
		
	}
	else
	{
		var index = buildTree.getIndexById(buildStepId);
		var newId = buildTree.getIdByIndex(index + diff);
		
		if (newId == null)
			return;
			
	}
	
	buildTree.select(newId);
}


var strokedId = null;
var setStrokedId = function(id)
{
	if (strokedId == id)
		return;
		
	clearElementStroke(document.getElementById(strokedId));
	setElementStroke(document.getElementById(id));
	
	strokedId = id;
}

window.setInterval(flashStroked, 500);


flashStatus = false;
function flashStroked()
{
	if (strokedId == null)
		return;
	
	if (flashStatus)
		clearElementStroke(document.getElementById(strokedId));
	else
		setElementStroke(document.getElementById(strokedId));
	
	flashStatus ^= true;
}

var setElementStroke = function(element)
{
	if (element)
		element.style.stroke = '#00A9F0';
}

var clearElementStroke = function(element)
{
	if (element)
		element.style.removeProperty('stroke');
}




var buildViewer = {
	view:"template",
	id:"buildViewer",
	css:"main-panel",
	template: "Loading..."
};

var infoPopUp = function (msg){
	webix.ui({
	    view:"popup",
	    id:"my_popup",
	    css:"info-popup",
	    width:450, height: 450,
	    body:{
	        template:'<div class= "popup-img-container" style="height:500px;">'+ msg +'</div>'
	    },
	    position: "center"
	}).show();
};













