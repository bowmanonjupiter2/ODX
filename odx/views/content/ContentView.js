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
	var _currentWidget = null;
	var _loader = null;
	var _type = null;
	
	return {
		init: function(){
			console.log("#" + VIEW_NAME + " - init()");
			_thisPage = this;
			if(this.id.indexOf('desktop') > -1)
				this.type = "desktop";
			else
				this.type = "mobile";
		},
		beforeActivate: function(preView, data){
			if(this._loader)
				this._loader.destroy(true);
			if(preView.id != this.id){
				this._currentWidget = data.id;
				this._loader = new ContentLoader({type: this.type,data: data}, "content");
				this._loader.startup();
			}else if(this._currentWidget != data.id) {
				this._currentWidget = data.id;
				this._loader = new ContentLoader({type: this.type,data: data}, "content");
				this._loader.startup();
			}
		}
	};
}
);