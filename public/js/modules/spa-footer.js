spa.footer = (function () {
		'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
  main_html : ""
},
stateMap = { $container : null },
jqueryMap = {},
setJqueryMap, initModule;

configMap.main_html += "				<div class=\"site-links-section\">";
configMap.main_html += "					<a href=\"#\">About us<\/a>";
configMap.main_html += "					<a href=\"#\">Contact<\/a>";
configMap.main_html += "					<a href=\"#contributors\">Authors<\/a>";
configMap.main_html += "					<a href=\"#\">Careers<\/a>";
configMap.main_html += "				<\/div>";
configMap.main_html += "				<p class=\"terms\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<\/p>";
	
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
var $container = stateMap.$container;
jqueryMap = { $container : $container };
};
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------
// Begin public method /initModule/
// Purpose : Initializes module
// Arguments :
// * $container the jquery element used by this feature
// Returns : true
// Throws : nonaccidental
//
initModule = function ( $container ) {
	stateMap.$container = $container;
	$container.append(configMap.main_html);
	setJqueryMap();
	return true;
};
// End public method /initModule/
// return public methods
return {
initModule : initModule
};
//------------------- END PUBLIC METHODS ---------------------
}());
