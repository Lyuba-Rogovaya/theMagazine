spa.menu = (function() {
	'use strict';
	//---------------- BEGIN MODULE SCOPE VARIABLES --------------
	var configMap = {},

		stateMap = {
			$container: null,
			menuHeight: null,
			menuIsRetracted: false
		},
		retractMenu, initModule;
	//----------------- END MODULE SCOPE VARIABLES ---------------
	//------------------- BEGIN UTILITY METHODS ------------------
	// example : getTrimmedString
	//-------------------- END UTILITY METHODS -------------------

	//--------------------- BEGIN DOM METHODS --------------------
	//---------------------- END DOM METHODS ---------------------
	//------------------- BEGIN EVENT HANDLERS -------------------
	retractMenu = function() {

		var $menu = $('nav');

		stateMap.menuHeight = $menu.innerHeight();

		if (stateMap.menuHeight < $(window).scrollTop()) {
			$menu.addClass("fixedNav");
			stateMap.menuIsRetracted = true;
		} else {
			$menu.removeClass("fixedNav");
			stateMap.menuIsRetracted = false;
		}

	}
	//-------------------- END EVENT HANDLERS --------------------
	//-------------------- BEGIN EVENT LISTENERS -----------------

	//-------------------- END EVENT LISTENERS -------------------
	//------------------- BEGIN PUBLIC METHODS -------------------
	// Begin public method /configModule/
	//
	// Begin public method /initModule/
	// Purpose : Initializes module
	// Arguments :
	// * $container the jquery element used by this feature
	// Returns : true
	// Throws : nonaccidental
	//
	initModule = function($container) {
		stateMap.$container = $container;
		$container.append(navigationTmpL);

		$(window).on("scroll", retractMenu);

		return true;
	};

	// End public method /initModule/
	// return public methods
	return {
		initModule: initModule
	};
	//------------------- END PUBLIC METHODS ---------------------
}());