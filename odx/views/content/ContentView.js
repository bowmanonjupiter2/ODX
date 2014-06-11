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
 	"odx/widget/ContentLoader",
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
	ContentLoader,
	data,
	Tree,
	Memory,
	Model
){
	var VIEW_NAME = "content";
	
	var _thisPage = null;
	
	return {
		init: function(){
			console.log("#" + VIEW_NAME + " - init()");
			_thisPage = this;
			new ContentLoader();
		}
	};
}
);