/**
 * 
 */
define(
[
 	"dojo/json",
 	"dojo/text!"+contextURL+"/odx/config/odx.json",
 	"dojox/app/main",
 	"dojo/has",
 	"dojo/dom",
 	"dojo/topic"/*,
 	"dojo/i18n!nls/Global_nls"*/
], function(
	json,
	config,
	Application,
	has,
	dom,
	topic/*,
	global*/
){
	console.debug("src.js");
	
	_thisPage = this;
	var jsonConfig = json.parse(config);
	
	has.add("ie9orLess", has("ie") && (has("ie") <= 9));

	Application(jsonConfig);
});