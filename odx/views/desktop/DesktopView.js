/**
 * 
 */
define(
[
 	"dojo/_base/declare",
 	"dojo/_base/lang",
 	"dojo/topic",
 	"dojo/store/Memory",
 	"dojo/date",
 	"dojo/date/locale",
 	"dojo/on",
 	"dojo/ready",
 	"dojo/dom",
 	"dojo/dom-class",
 	"dojo/dom-construct",
 	"dojox/mobile/TransitionEvent",
 	"dojo/json",
 	"dojo/text!./data/DesktopWidgets.json",
 	"dijit/Tree",
 	"dojo/store/Memory",
 	"dijit/tree/ObjectStoreModel",
 	"dijit/registry",
 	"dojo/domReady!"
], function(
	declare,
	lang,
	topic,
	Memory,
	date,
	locale,
	on,
	ready,
	dom,
	domClass,
	domConstruct,
	TransitionEvent,
	json,
	data,
	Tree,
	Memory,
	Model
){
	var VIEW_NAME = "desktop";
	
	var _thisPage = null;
	
	return {
		init: function(){
			console.log("#" + VIEW_NAME + " - init()");
			_thisPage = this;
			this.createWidgetList();
		},
		createWidgetList: function(){
			var widgetStore = new Memory({
				data: [json.parse(data)],
				getChildren: function(obj){
					return obj.children || [];
				}
			});
			
			var widgetModel = new Model({
				store: widgetStore,
				query: {id: "root"},
				mayHaveChildren: function(item){
					return "children" in item;
				}
			});
			
			var widgetTree = new Tree({
				model: widgetModel,
				openOnClick: true,
				onLoad: function(){
					
				},
				onClick: _thisPage.treeItemClick,
				persist: false,
				showRoot: false
			}, "desktop-widgets-list");
			
			widgetTree.startup();
			widgetTree.expandAll();
		},
		
		treeItemClick: function(item, nodeWidget, e){
			var transOpts = {
					target: "main,desktop,content",
					url: "#main,desktop"
			};
			new TransitionEvent(e.target, transOpts, e).dispatch();
		}
	};
}
);