showParts = function(){
	$$("listParts").show();
	$$("partsViewer").show();
	mainlayout.adjust();
};


function partsUpdateData(data) {
	$$('partsTable').parse(data);
		
	data.forEach(function (item) {
		$$('partsViewer').addView(
			{
				view:"template",
				template:item['desc'],
				id:"partsViewer" + item['name'],
			});
	});
		
}

var listParts = {
	id:"listParts",
    width:450,
	rows: [
	    {
	        view: "button",
	        type: "icon",
	        label: "overview",
	        icon:"info",
	        on: {
	            'onItemClick' : function() {
	                $$("partsViewer").setValue("partsViewerOverview");
	            }
	        }
	    },
		{
			view:"datatable",
            id:"partsTable",
            rowHeight:48,
            hover:"datatable-hover",
			columns:[
					{ 
					    id:"img",
					    width:48,
					    template: '<img src="#img#" height=42>',
                        css:"list-parts-img-col",
					    cssFormat: function(cell, item) {
        		            switch (item.category)
        		            {
        		                case "controller":
        		                    return {"background-color":"#4369A4"};
        		                case "input":
        		                    return {"background-color":"#FDB72F"};
        		                case "output":
        		                    return {"background-color":"#A761AD"};
                                default:
                                case "aux":
                                    return {"background-color":"white"};
        		            }
        		        }
					},
					{ id:"name", adjust:true, minWidth:300},
					{ 
                        id:"qty",
                        width:40,
                        template: function(obj, common) {
                            if(obj.qty) 
                                return 'X'+ obj.qty    
                            else 
                                return ""
                        },
                    },
					{ 
						id:"link",
						width:40,
						template: function(obj, common) {
							if (obj.link)
								return "<a href=" + obj.link + " target='_blank'><span class='webix_icon fa-shopping-cart'/></a>";
							else
								return ""
						}
					}
					],
			select:true,
			header:false,
			on:
			{
			    onAfterSelect: function(id){
			        var itemName = this.getItem(id).name;
					$$("partsViewer").setValue("partsViewer" + itemName);
				}
            }
        },
        // {view: "button", type: "icon", label: "print", icon:"print"},
		{view: "button", type: "icon", label: "help", icon:"question-circle"},
		{view: "button", type: "icon", label: "bug", icon:"bug"},
		{view:"toolbar",
			cols:[
				{ view:"icon", icon:"star"},
				{ view:"icon", icon:"star"},
				{ view:"icon", icon:"star"},
				{ view:"icon", icon:"star"},
				{ view:"icon", icon:"star"},
		]}
	]
};

var partsViewer = {
   	view:"multiview",
    css:"main-panel",
    id:"partsViewer",
    cells:[
            {
                id:"partsViewerOverview",
                template:"html->partsViewerDiv"
            }]
};

