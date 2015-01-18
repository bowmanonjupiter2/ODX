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
		"dojox/mobile/ListItem",
		"dojo/_base/array",
		"dojo/text!../desktop/data/DesktopWidgets.json",
		"dojo/json",
		"dojox/mobile/RoundRectList",
		"dojox/mobile/SearchBox",
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
		TransitionEvent,ListItem,array,data,json
	) {
		
		
		childrenlist = new Array();
		var i=0;
		store = new Memory({data: [json.parse(data)],
			getChildren:function(obj){
				return obj.children || [];
			}
			});
		var getWidgetList = function(parent) {
			if (parent == undefined) {
				parent = store.query({
					id: "root"
				})[0];
			}
			var children = store.getChildren(parent);
			if (children.length > 0) {
				array.forEach(children, function(item) {
					getWidgetList(item);
				})
			} else {
				childrenlist[i] = parent;
				i++;
			}
		}
		
		getWidgetList();

		storeWidgetList = new Memory({data: childrenlist});
		var VIEW_NAME = "main";

		var _thisPage = null;
		

		return {
			init: function() {
				console.log("#" + VIEW_NAME + " - init()");
				_thisPage = this;
			},
	
			// afterActivate: function(){
// 				//Get the name of current subView and set specified menu item as hovering
// 				var currentView = _thisPage.selectedChildren.center.name;
// 				alert(currentView)
// 				dijit.byId(currentView + "Tab").set("hovering", true);
// 			},
			menuItemClick: function(item, evt) {
				//Make current menu as hovering
				item.set("hovering", true);


				var subView = null;
				switch (item.id) {
					case "welcomeTab":
						subView = "welcome";
						break;
					case "desktopTab":
						subView = "desktop";
						break;
					case "mobileTab":
						subView = "mobile";
						break;
				}
				//Get the name of current subView
				var currentView = _thisPage.selectedChildren.center.name;
				if (/* currentView != subView */ true) {
					console.log("From " + currentView + " to " + subView);
					var transOpts = {
						target: "main," + subView,
						url: "#main," + subView
					};
					new TransitionEvent(evt.target, transOpts, evt).dispatch();
				}
			},
			//Search function - Scholes
			onSearch: function(results, query, options){
				if(query.name == "*"){
					list.destroyDescendants();
					return;
				}
			    if(options.start == 0){
			      list.destroyDescendants();
			    }
			    array.forEach(results, function(item){
			      list.addChild(new ListItem({label: item.name}));
			    });
			    if((options.start+results.length) < results.total){
			      results.nextPage();
			    }
			}
		};
	}
);
