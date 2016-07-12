spa.secondaryFeatured = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {}, stateMap = {
        $container: null
    }, jqueryMap = {}, setJqueryMap, fetchContent, initModule, $secondaryFeature, $otherSecFeature, fixStyle;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    // purpose: cashes module container and DOM on module init load;
    //
    setJqueryMap = function() {
        var $container = stateMap.$container;
        $secondaryFeature = $container.find('.secondary-featured-articles');
        $otherSecFeature = $container.find('.other-secondary-featured-articles');
    };
	   // End DOM method /setJqueryMap/
	   
	   // Begin DOM method /fixStyle/
	   // Purpose: removes the right border of the element
	   fixStyle =  function (element) {
		      element.addClass('last');
	   };
	   // End DOM method /fixStyle/
	
    // Begin DOM method /fetchContent/
    // Purpose: fetches content for the home page featured mini-module, then renders templates and appends them to the container
    fetchContent = function() {
        var i, j, output = "", renderContent;
					
        httpReq("GET", "secondary-featured").then(function(data) {
            renderContent(data);
        }).catch(function(error) {
            console.log(error);
        });
        renderContent = function(data) {
            if (data.length === 0)
                return;
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
        };
    };
    // End DOM method /fetchContent/
	
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
				
    // Begin public method /initModule/
				// Purpose: Initializes module, a cashes DOM
    initModule = function($container) {
        stateMap.$container = $container;
        setJqueryMap();
        fetchContent();
        return true;
    }
    ;
    // End public method /initModule/
	
    // return public methods
    return {
        initModule: initModule
    };
    //------------------- END PUBLIC METHODS ---------------------
}());
