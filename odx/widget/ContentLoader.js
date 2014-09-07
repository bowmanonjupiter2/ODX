define([ "dojo/_base/declare",
         "dojo/dom",
         "dojo/on",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./template/ContentLoader.html",
         "dojo/_base/lang",
         "dijit/registry",
         "dojo/domReady!"
         ],
function(declare,
		dom,
		on,
		_WidgetBase,
		_TemplatedMixin,
		_WidgetsInTemplatedMixin,
		template,
		lang,
		registry){
	var ContentLoader = declare("odx.widget.ContentLoader", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin], {
		templateString: template,
		type: null,
		data: null,
		selectedItem: null,
		constructor: function(params, srcNodeRef){
			this.domNode = dom.byId(srcNodeRef);
			lang.mixin(this, params);
		},
		postCreate: function(){
			this.overviewTab.set("href", this._getSourcePath()+"/overview.html");
//			this.playTab.set("href", this._getSourcePath()+"/play.html");
		},
		_getSourcePath: function() {
			return "source/"+this.type+"/"+this.data.id.substring(this.data.id.lastIndexOf("/")+1);
		},
		initPlay: function(){
			//require(["dojo/text?"],function(){});
		}
	});
	
	return ContentLoader;
});