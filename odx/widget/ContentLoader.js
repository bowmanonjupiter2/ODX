define([ "dojo/_base/declare",
         "dojo/dom",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./template/ContentLoader.html",
         "dojo/_base/lang",
         "dijit/registry",
         "dijit/layout/TabContainer",
         "dijit/layout/ContentPane",
         "dojo/parser",
         "dojo/domReady!"
         ],
function(declare,
		dom,
		_WidgetBase,
		_TemplatedMixin,
		_WidgetsInTemplatedMixin,
		template,
		lang,
		registry,
		TabContainer,
		ContentPane){
	var ContentLoader = declare("odx.widget.ContentLoader", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplatedMixin], {
		templateString: template,
		title: "",
		selectedItem: null,
		constructor: function(){
			var tc = new TabContainer({
		        style: "height: 100%; width: 100%;"
		    }, "contentTabContainer");

		    var cp1 = new ContentPane({
		         title: "Food",
		         content: "We offer amazing food"
		    });
		    tc.addChild(cp1);

		    var cp2 = new ContentPane({
		         title: "Drinks",
		         content: "We are known for our drinks."
		    });
		    tc.addChild(cp2);

		    tc.startup();
		}
	});
	
	return ContentLoader;
});