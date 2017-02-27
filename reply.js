var menu_data = [
	{id: "home", icon: "home", value:"Start"},
	{id: "parts", icon: "shopping-cart", value:"BOM"},
	{id: "code", icon: "code", value:"Code"},
	{id: "build", icon: "wrench", value:"Wire"},
	{id: "iot", icon: "wifi", value:"Connect"},
	{id: "share", icon: "share-alt", value:"Share"},
	{id: "project", icon: "arrow-circle-left", value:"Circuit"},
];

hideAll = function(){
	$$("listParts").hide();
	$$("listCode").hide();
	$$("listBuild").hide();
	$$("codeViewer").hide();
	$$("codeHelp").hide();
	$$("partsViewer").hide();
	$$("buildViewer").hide();
	$$("htmlViewer").hide();
}

var layout_sidemenu = {
						view: "list",
						id:"sidemenu",
						select:true,
						scroll: false,
						data: menu_data,
						width: 120,
						css:"sidemenu",
						disabled:true,
						on:{
							"onAfterLoad": function () {
								this.select(this.getIdByIndex(0));
							},
							"onAfterSelect": function(id){
								if (!mainLayoutLoaded)
									return;
								
								hideAll();

								switch (id)
								{
									case "parts":
										showParts();
										break;
									case "code":
										showCode();
										break;
									case "build":
										showBuild();
										break;
									case "iot":
										showHTML("iotDiv");
										break;
									case "project":
										window.location.href = "https://www.circuito.io/app";
										break;
									case "home":
										showHTML("homeDiv");
										break;
									case "share":
										showHTML("shareDiv");
										break;
								}
							}
						}
					};



var layout_toolbar = 
	{
		view: "toolbar",
		padding:3,
		height:48,
		css:"toolbar-style",
		elements:
			[
				{
					view: "button",
					type: "icon",
					icon: "bars",
					width: 37,
					align: "left",
					css: "app_button",
					click: function()
					{
						$$("mainSidebar").toggle()
					}
				},
					{view: "button", type: "htmlbutton", label:"<a href='https://www.circuito.io/app'><img src='assets/logo.svg'></a>", inputWidth:160},
			]
	};



var layout_footer = 
	{
		view: "toolbar",
		padding:3,
		height:48,
		css:"footer-style",
		elements:
			[
				{view: "button", align: "left", css: "footer-btn", width:96, type: "htmlbutton", label:"<a href='https://circuito.io/about'>about us</a>"},
				{view: "button", align: "left", css: "footer-btn", width:64, type: "htmlbutton", label:"<a href='https://circuito.io/faq'>F.A.Q</a>"},
				{view: "button", align: "left", css: "footer-btn", width:64, type: "htmlbutton", label:"<a href='http://talk.circuito.io/'>Talk</a>"},
				{view: "button", align: "left", css: "footer-btn-light", width:140, type: "htmlbutton", label:"<a href='https://circuito.io/terms'>Terms of service</a>"},
				{view: "button", align: "left", css: "footer-btn-light", width:64, type: "htmlbutton", label:"<a href='https://circuito.io/privacy'>Privacy</a>"},
				{},
				{view: "button", align: "center", type: "htmlbutton", width:48, label:"<a href='http://roboplan.io/'><img src='assets/footer/roboplan.svg'></a>", inputWidth:48},
				{},
				{view: "button", align: "right", type: "htmlbutton", width:48, label:"<a href='https://www.hackster.io/circuito-io'><img src='assets/footer/hackster.svg'></a>", inputWidth:48},
				{view: "button", align: "right", type: "htmlbutton", width:48, label:"<a href='https://twitter.com/circuitoio'><img src='assets/footer/twitter.svg'></a>", inputWidth:48},
				{view: "button", align: "right", type: "htmlbutton", width:48, label:"<a href='https://www.facebook.com/circuito.io'><img src='assets/footer/facebook.svg'></a>", inputWidth:48},
				{view: "button", align: "right", type: "htmlbutton", width:48, label:"<a href='https://www.youtube.com/c/Circuitoio'><img src='assets/footer/youtube.svg'></a>", inputWidth:48},
				{view: "button", align: "right", type: "htmlbutton", width:48, label:"<a href='http://www.instructables.com/member/Circuito+io/'><img src='assets/footer/instructables.svg'></a>", inputWidth:48},
				{},
			]
	};



var layout = {
		containter:"basediv",
		responsive:true,
		rows: [
			layout_toolbar,
			{
				//type: "material",
				cols:[
					layout_sidemenu,
					listParts,
					listCode,
					listBuild,
					//{ view:"resizer" },
					partsViewer,
					codeViewer,
					codeHelp,
					buildViewer,
					htmlViewer,
				]
			},
			layout_footer,
		],
	};

var mainLayoutLoaded = false;

var mainlayout;
mainlayout = webix.ui(layout);
mainLayoutLoaded = true;

hideAll();
showHTML("homeDiv");

webix.ajax("data.json", function(text,data){
	data = data.json();
	
	// start with IoT because it's small and modifies menu structure
	iotData = data['iot'];
	iotUpdateData(iotData);

    partsData = data['BoM'];
	partsUpdateData(partsData);
	
	codeData = data['code'];
	codeUpdateData(codeData);
	
	buildData = data['build'];
	buildUpdateData(buildData);
	
	// currently this data is empty
	shareData = data['share'];
	shareUpdateData(shareData);
	
	$$('sidemenu').enable();
	$$('htmlViewer').enable();

});
