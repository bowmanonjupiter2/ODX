/**
 *
 */
define(
	[
		"dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/_base/array",
		"dojo/query",
		"dojo/string",
		"dojo/topic",
		"dojo/date",
		"dojo/date/locale",
		"dojo/on",
		"dojo/ready",
		"dojo/dom",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/dom-attr",
		"dojo/parser",
		"dijit/registry",
		"dojo/json",
		"dojo/domReady!"
	], function(
		declare,
		lang,
		array,
		query,
		string,
		topic,
		date,
		locale,
		on,
		ready,
		dom,
		domClass,
		domConstruct,
		domAttr,
		parser,
		registry,
		json
	) {
		var VIEW_NAME = "content";
		var _thisPage = null;
		var overviewTab = null;
		var playTab = null;
		var guidenceTab = null;
		var demoBox = null;
		var declarationBox = null;
		var programmaticBox = null;
		var settingBox = null;
		var htmSrcOrgi = null;
		var jsSrcOrgi = null;
		var settingStrOrgi = null;
		var htmSrc = null;
		var jsSrc = null;
		var settingStr = null;
		return {
			init: function() {
				console.log("#" + VIEW_NAME + " - init()");
				_thisPage = this;
				overviewTab = dijit.byId("desktop-overview-tab");
				playTab = dijit.byId("desktop-play-tab");
				guidenceTab = dijit.byId("desktop-guidence-tab");
				demoBox = dijit.byId("desktop-play-demo");
				declarationBox = dijit.byId("desktop-play-declaration");
				programmaticBox = dijit.byId("desktop-play-programmatic");
				settingBox = dijit.byId("desktop-play-setting");
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
				overviewTab.set("href", _thisPage.data.path + "/overview.html");
				guidenceTab.set("href", _thisPage.data.path + "/guidence.html");
				_thisPage._constructPlayPane();
			},
			_constructPlayPane: function() {
				//Clean play pane first
				_thisPage._cleanPlayPane();
				require([
					"dojo/text!./" + _thisPage.data.path + "/play/htm.txt",
					"dojo/text!./" + _thisPage.data.path + "/play/js.txt",
					"dojo/text!./" + _thisPage.data.path + "/play/setting.txt"
				], function(
					htm,
					js,
					setting
				) {
					htmSrcOrgi = htm;
					jsSrcOrgi = js;
					settingSrcOrgi = json.parse(setting, true);
					_thisPage._renderSettingBox();
					_thisPage._updateSource();
				});
			},
			_renderDemoBox: function() {
				dojo.forEach(registry.findWidgets(demoBox.containerNode), function(widget) {
					widget.destroyRecursive();
				});
				demoBox.set("content", null);
				var newNode = domConstruct.create("div", {
					id: "demo",
					className: "",
					innerHTML: htmSrc
				}, demoBox.containerNode);
				parser.parse(newNode);
			},
			_renderDeclarationBox: function() {
				declarationBox.set("content", null);
				domConstruct.create("pre", {
					id: "declaration",
					className: "brush: html",
					innerHTML: _thisPage._processString(htmSrc)
				}, declarationBox.containerNode);
			},
			_renderProgrammaticBox: function() {
				programmaticBox.set("content", null);
				domConstruct.create("pre", {
					id: "programmatic",
					className: "brush: js; html-script: true;",
					innerHTML: _thisPage._processString(jsSrc)
				}, programmaticBox.containerNode);
			},
			_renderSettingBox: function() {
				
			
				var textfieldTmpl = '<div class="property-wrapper"><label class="property-label" for="${propName}">${displayName}</label><br/><input type="text" class="property" name="${propName}" value="${defaultValue}"/></div>';
				var uncheckboxTmpl = '<div class="property-wrapper"><input type="checkbox" class="property" name="${propName}"/><label class="property-label" for="${propName}">${displayName}</label></div>';
				var checkboxTmpl = '<div class="property-wrapper"><input type="checkbox" class="property" name="${propName}" checked=${defaultValue}/><label class="property-label" for="${propName}">${displayName}</label></div>';
				var textareaTmpl = '<div class="property-wrapper"><label class="property-label" for="${propName}">${displayName}</label><br/><textarea class="property" name="${propName}">${defaultValue}</textarea></div>';
				var newPropDom = null;
				array.forEach(settingSrcOrgi.props, function(prop, index) {
					switch (prop.tagName) {
						case "text":
							newPropDom = domConstruct.place(string.substitute(textfieldTmpl, prop), settingBox.containerNode, "last");
							break;
						case "checkbox":
							if (prop.defaultValue=="true"){
								newPropDom = domConstruct.place(string.substitute(checkboxTmpl, prop), settingBox.containerNode, "last");
							}
							else{
								newPropDom = domConstruct.place(string.substitute(uncheckboxTmpl, prop), settingBox.containerNode, "last");
							}
							break;
						case "option":
							newProDox = domConstruct.place(string.substitute(textareaTmpl, prop), settingBox.containerNode, "last");
							break;
						case "function":
							newPropDom = domConstruct.place(string.substitute(textfieldTmpl, prop), settingBox.containerNode, "last");
							break;//Scholes added 
					}
				});
				//Bind onChange event to each property setting
				query(".property", settingBox.containerNode).forEach(function(node, i) {
					on(node, "change", _thisPage._updateSource);
				});
			},
			_cleanPlayPane: function() {
				demoBox.set("content", null);
				declarationBox.set("content", null);
				programmaticBox.set("content", null);
				settingBox.set("content", null);
			},
			_updateSource: function(evt) {
				var map = {}, props = [];
				query(".property", settingBox.containerNode).forEach(function(node, i) {
					if (node.name == "options") {
						map["options"] = "<option>" + node.value.split("\n").join("</option>\n<option>") + "</option>";
						var tempStore = null;
						array.forEach(node.value.split("\n"), function(option, index) {
							tempStore = tempStore ? tempStore + ",\n" + '{name: "' + option + '", id: "' + option + '"}' :
								'{name: "' + option + '", id: "' + option + '"}';
						});
						map["dataStore"] = tempStore;
					}else if (node.name == "optionsValues") 
					{
						
						var tempStore = null;
						var str="";
						array.forEach(node.value.split("\n"), function(option, index) {
							 str = str+"<Option value ='"+option+"'>"+option+"</Option>"+"\n";
						});
						
						map["options"]=str;					
						array.forEach(node.value.split("\n"), function(option, index) {
							tempStore = tempStore ? tempStore + ",\n" + '{name: "' + option + '", id: "' + option + '"}' :
								'{name: "' + option + '", id: "' + option + '"}';
						});
						map["dataStore"] = tempStore;
						
						
					}
					else if (node.name == "id") {
						map[node.name] = node.value;
					} else if (node.name == "label") {
						map[node.name] = node.value;
					} else if (node.name == "name") {
							map[node.name] = node.value;
					} else {
						if (domAttr.get(node, "type") == "checkbox") {
							//props.push(node.name + ": '" + node.checked + "'")
						    	props.push(node.name + ": " + node.checked);
						} else {//Scholes added for event
							if((node.name == "onClick")||(node.name == "onChange"))
							{
								props.push(node.name + ": " + node.value);
							}else
								props.push(node.name + ": '" + node.value + "'");
							//props.push(node.name + ": '" + node.value + "'");
						}
					}
				});
				map['props'] = props.join(",\n");
				htmSrc = string.substitute(htmSrcOrgi, map);
				jsSrc = string.substitute(jsSrcOrgi, map);
				_thisPage._renderDemoBox();
				_thisPage._renderDeclarationBox();
				_thisPage._renderProgrammaticBox();
				SyntaxHighlighter.highlight("pre");
			},
			_processString: function(s) {
				return s.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
			}
		};
	}
);