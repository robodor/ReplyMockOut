var editor = null;

 var downloadClick = function() {
				download(downloadURL);
				webix.modalbox({
					// title:"Important: Unzip all files to a directory",
					buttons:["Got it!"],
					width:"600px",
					text:'<img src="assets/unzip.svg" style="width:100%;" align="middle	">',
					position:'top',
					//callback:function(result){ alert("Result "+result)}
				});
			};

showCode = function(){
	$$("listCode").show();
	$$("codeHelp").show();
	$$("codeViewer").hide();
	mainlayout.adjust();
	//$$('codefilesTree').select('root');
};

showCodeViewer = function(){
	$$("listCode").show();
	$$("codeHelp").hide();
	$$("codeViewer").show();
	editor = ace.edit("editorDiv");
	mainlayout.adjust();
	editor.resize();
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/c_cpp");
	editor.setReadOnly(true);
	//$$('codefilesTree').callEvent('onItemClick', [firstFileName]);
};


function codeUpdateData(data) {
	dataWithRoot = [{
		"id":"root",
		"filename":"Firmware.zip",
		"open":true,
		"data": data,
	}];
	
	$$('codefilesTree').parse(dataWithRoot);

}

var codeViewer = {
	id:"codeViewer",
	template:getCachedHTMLElement("codeDiv")
};

var codeHelp = {
	id:"codeHelp",
	css:"main-panel",
	template: 'html->codeHelpDiv',
	scroll:'y',
	}

var firstFileName = 'Firmware.ino'
var listCode = {
	id:"listCode",
	width:300,

	rows: [
		{
	        view: "button",
	        type: "icon",
	        label: "overview",
	        icon:"info",
	        on: {
	            'onItemClick' : function() {showCode();;}
	        }
	    },
		{
			id:'codefilesTree',
			view:"tree",
			css:"code-files-tree",
			template:"{common.folder()} #filename#",
			type:{
				folder:function(obj){
				if(obj.$level == 1)
					return "<span class='webix_icon fa-folder-o'></span>";
				if (obj.$level == 2)
					return "<span class='webix_icon fa-file-o'></span>";
				},
			},
			select:true,
			on: {
				'onSelectChange': function(id) {
					if (id != 'root')
					{
						if (!$$('codeViewer').isVisible())
							showCodeViewer();
						var item = this.getItem(id);
						editor.setValue(item['content'], -1);
					}
				},
				'onAfterLoad': function()
				{
					this.sort('filename');
					this.move(firstFileName, null, null, {parent: 'root'});
					//this.select(firstFileName);
				}
			}
		},
		{
			view: "button",
			type: "icon",
			css:"code-button",
			label: "download Firmware.zip",
			icon:"download",
			click: downloadClick,
		},
		{view: "button", type: "icon", label: "help", icon:"question-circle"},
		{view: "button", type: "icon", label: "bug", icon:"bug"},
		]
};


