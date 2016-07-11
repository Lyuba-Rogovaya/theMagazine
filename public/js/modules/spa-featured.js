spa.featured = (function() {
	//---------------- BEGIN MODULE SCOPE VARIABLES --------------
	var configMap = {},
		stateMap = {
			$moduleContainer: null,
		},
		fetchContent;


	//----------------- END MODULE SCOPE VARIABLES ---------------

	//--------------------- BEGIN DOM METHODS --------------------

	fetchContent = function() {
		var renderContent, output;

				renderContent = function (data) {
							Mustache.parse(featuredArtTmpl);
							output = Mustache.render(featuredArtTmpl, data);
					  stateMap.$moduleContainer.html(output);
				};

		httpReq("GET", "featured")
			.then(function(data) {
				renderContent(data);
			})
			.catch(function(error) {
				console.log(error);
			})

	}

	//---------------------- END DOM METHODS ---------------------
	//------------------- BEGIN EVENT HANDLERS -------------------

	//-------------------- END EVENT HANDLERS --------------------
	//-------------------- BEGIN EVENT LISTENERS -----------------

	//-------------------- END EVENT LISTENERS -------------------
	//------------------- BEGIN PUBLIC METHODS -------------------

	// Begin public method /fetchContent/
	// End public method /fetchContent/
	//
	//
	// Begin public method /initModule/
	// Purpose : Initializes module
	// Arguments :
	// * $container the jquery element used by this feature
	// Returns : true
	// Throws : nonaccidental
	//
	initModule = function($container) {
		stateMap.$moduleContainer = $container;
		fetchContent();
		return true;
	};

	// End public method /initModule/
	// return public methods
	return {
		initModule: initModule,
	};
	//------------------- END PUBLIC METHODS ---------------------
}());