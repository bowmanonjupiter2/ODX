/**
 * 
 */
require(
[
 	"dojox/json/ref",
 	"dojo/text!./config/odx.json",
 	"dojox/app/main",
 	"dojo/has",
 	"dojo/dom",
 	"dojo/topic"/*,
 	"dojo/i18n!./nls/Global_nls.js"*/
], function(
	jsonRef,
	config,
	Application,
	has,
	dom,
	topic/*,
	global*/
){
	console.debug("src.js");
	
	_thisPage = this;
	var jsonConfig = jsonRef.fromJson(config);
	
	has.add("ie9orLess", has("ie") && (has("ie") <= 9));

	Application(jsonConfig);
});