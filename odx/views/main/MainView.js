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
){
	var VIEW_NAME = "main";
	
	var _thisPage = null;
	
	return {
		init: function(){
			console.log("#" + VIEW_NAME + " - init()");
			_thisPage = this;
			this.loadLinteners();
		},
		loadLinteners: function(){
			var welcomeTab = dom.byId("welcomeTab");
			var desktopTab = dom.byId("desktopTab");
			var mobileTab = dom.byId("mobileTab");
			on(welcomeTab, "click", function(e){
				var transOpts = {
						target: "main,welcome",
						url: "#main,welcome"
				};
				new TransitionEvent(e.target, transOpts, e).dispatch();
			});
			on(desktopTab, "click", function(e){
				var transOpts = {
						target: "main,desktop",
						url: "#main,desktop"
				};
				new TransitionEvent(e.target, transOpts, e).dispatch();	
			});
			on(mobileTab, "click", function(e){
				var transOpts = {
						target: "main,mobile",
						url: "#main,mobile"
				};
				new TransitionEvent(e.target, transOpts, e).dispatch();
			});
		},
		updateContentView: function(item){
			
		}
	};
}
);