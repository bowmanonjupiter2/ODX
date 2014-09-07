/**
 *
 */
define(
	[
		"dojo/_base/declare",
		"dojo/_base/lang",
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
		"dojo/store/Memory",
		"dijit/tree/ObjectStoreModel",
		"dojo/text!./template/LandingView.html",
		"dijit/registry",
		"dojo/domReady!"
	], function(
		declare,
		lang,
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
		Memory,
		Model,
		LandingView
	) {
		var VIEW_NAME = "content";

		var _thisPage = null;
		var isPlayed = false;
		return {
			init: function() {
				console.log("#" + VIEW_NAME + " - init()");
				_thisPage = this;

			},
			beforeActivate: function(previous, data) {
				lang.mixin(data, {
					path: "source/desktop/" + data.id.substring(data.id.lastIndexOf("/") + 1)
				});
				lang.mixin(_thisPage, {
					data: data
				});
			},
			afterActivate: function(current, data) {
				alert(2)
				dijit.byId("desktop-overview-tab").set("href", _thisPage.data.path + "/overview.html");
				dijit.byId("desktop-guidence-tab").set("href", _thisPage.data.path + "/guidence.html");
				dijit.byId("desktop-play-tab").set("onShow", _thisPage.constructPlayPane);
			},
			constructPlayPane: function(e){
				alert(123)
				//If selected widget not change, then return.
				if(isPlayed && _thisPage.data.id == _thisPage.parent.getSelectItem().id){
					return;
				}
				isPlayed = true;
			}
		};
	}
);
