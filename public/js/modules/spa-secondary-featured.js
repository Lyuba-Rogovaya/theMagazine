spa.secondaryFeatured = (function() {
	'use strict';
	//---------------- BEGIN MODULE SCOPE VARIABLES --------------
	var configMap = {},
		stateMap = {
			$container: null
		},
		jqueryMap = {},
		setJqueryMap, fetchContent, initModule, $secondaryFeature, $otherSecFeature, fixStyle;

	//----------------- END MODULE SCOPE VARIABLES ---------------

	//--------------------- BEGIN DOM METHODS --------------------
	// Begin DOM method /setJqueryMap/
	setJqueryMap = function() {
		var $container = stateMap.$container;
		$secondaryFeature = $container.find('.secondary-featured-articles');
		$otherSecFeature = $container.find('.other-secondary-featured-articles');
	};
 fixStyle =  function (element) {
		element.addClass('last');
	}
	fetchContent = function() {
		var i, j, output = "",
			renderContent;

		renderContent = function(data) {
			if (data.length === 0) return;
			Mustache.parse(seondFeaturedArtTmpl);
			Mustache.parse(otherSeondFeaturedArtTmpl);
			for (i = 1; i < 3; i++) {
				output += Mustache.render(seondFeaturedArtTmpl, data[i]);
			}
			$secondaryFeature.append(output);
			fixStyle($secondaryFeature.children().last());
			output = "";
			for (j = 3; j < data.length; j++) {
				output += Mustache.render(otherSeondFeaturedArtTmpl, data[j]);
			}
			$otherSecFeature.append(output);
			fixStyle($otherSecFeature.children().last());
		}
		httpReq("GET", "secondary-featured")
			.then(function(data) {
				renderContent(data);
			})
			.catch(function(error) {
				console.log(error);
			})
	}

	// End DOM method /setJqueryMap/
	//---------------------- END DOM METHODS ---------------------

	//------------------- BEGIN EVENT HANDLERS -------------------
	//-------------------- END EVENT HANDLERS --------------------

	//------------------- BEGIN PUBLIC METHODS -------------------
	// Begin public method /initModule/
	// Purpose : Initializes module
	// Arguments :
	// * $container the jquery element used by this feature
	// Returns : true
	// Throws : nonaccidental
	//
	initModule = function($container) {
		stateMap.$container = $container;
		setJqueryMap();
		fetchContent();
		return true;
	};
	// End public method /initModule/
	// return public methods
	return {
		initModule: initModule
	};
	//------------------- END PUBLIC METHODS ---------------------
}());