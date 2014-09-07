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
	) {
		var VIEW_NAME = "desktop";

		var _thisPage = null;
		var _widgetTree = null;
		

		return {
			init: function() {
				console.log("#" + VIEW_NAME + " - init()");
				_thisPage = this;
				this.createWidgetList();
			},
			createWidgetList: function() {
				var widgetStore = new Memory({
					data: [json.parse(data)],
					getChildren: function(obj) {
						return obj.children || [];
					}
				});

				var widgetModel = new Model({
					store: widgetStore,
					query: {
						id: "root"
					},
					mayHaveChildren: function(item) {
						return "children" in item;
					}
				});

				_widgetTree = new Tree({
					model: widgetModel,
					openOnClick: false,
					animation: false,
					onClick: _thisPage.treeItemClick,
					persist: false,
					showRoot: false,
					getIconClass: function(item, opened){ /*Customize icon class here*/
					    return (!item || this.model.mayHaveChildren(item)) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf"
					},
				}, "desktop-widgets-list");
				_widgetTree.startup();
				_widgetTree.expandAll();
			},
			treeItemClick: function(item, node, e) {
				if (item.type != "group") {
					console.log(item)
					var transOpts = {
						target: "main,desktop,content",
						url: "#main,desktop,content",
						data: item,
						params: {
							id: item.id
						}
					};
					new TransitionEvent(e.target, transOpts, e).dispatch();
				}
			},
			getSelectItem: function(){
				return _widgetTree.selectedItem;
			}
		};
	}
);
