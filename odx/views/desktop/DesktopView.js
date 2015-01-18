/**
 *
 */
define([
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/_base/array",
		"dojo/topic",
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
	],
	function(
		declare,
		lang,
		array,
		topic,
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
		var _widgetStore = null;

		return {
			init: function() {
				console.log("#" + VIEW_NAME + " - init()");
				_thisPage = this;
				this.createWidgetList();
			},
			createWidgetList: function() {
				_widgetStore = new Memory({
					data: [json.parse(data)],
					getChildren: function(obj) {
						return obj.children || [];
					}
				});
				var widgetModel = new Model({
					store: _widgetStore,
					query: {
						id: "root"
					},
					mayHaveChildren: function(item) {
						return "children" in item;
					}
				});
				_widgetTree = new Tree({
					model: widgetModel,
					openOnClick: true,
					animation: false,
					onClick: _thisPage.treeItemClick,
					persist: false,
					showRoot: false,
					getIconClass: function(item, opened) { /*Customize icon class here*/
						//return (!item || this.model.mayHaveChildren(item)) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf"
						return (!item || this.model.mayHaveChildren(item)) ? (opened ? "treeFolderOpened" : "treeFolderClosed") : "treeLeaf"
					},
				}, "desktop-widgets-list");
				_widgetTree.startup();
				_widgetTree.expandAll();
			},
			treeItemClick: function(item, node, e) {
				if (item.type != "group") {
					//wrap the search list - Scholes
					list.destroyDescendants();
					var transOpts = {
						target: "main,desktop,content",
						url: "#main,desktop",
						data: item,
						params: {
							id: item.id
						}
					};
					new TransitionEvent(e.target, transOpts, e).dispatch();
				}
			},
			getSelectItem: function() {
				return _widgetTree.selectedItem;
			},
			getWidgetDataById: function(id, parent) {
				if (parent == undefined) {
					parent = _widgetStore.query({
						id: "root"
					})[0];
				}
				var children = _widgetStore.getChildren(parent);
				if (children.length > 0) {
					array.forEach(children, function(item) {
						_thisPage.getWidgetDataById(id, item);
					})
				} else if (parent.id == id) {
					return parent;
				}
			}
		};
	}
);
