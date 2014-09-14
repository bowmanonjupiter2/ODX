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
		TransitionEvent
	) {
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
			}
		};
	}
);
