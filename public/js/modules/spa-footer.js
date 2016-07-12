spa.footer = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {}, 
								stateMap = {
            $container: null
    }, jqueryMap = {}, setJqueryMap, initModule;

    //----------------- END MODULE SCOPE VARIABLES ---------------
    //--------------------- BEGIN DOM METHODS --------------------
	
    // Begin DOM method /setJqueryMap/
    // purpose: cashes module container and DOM on module init load;
    //
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container
        };
    };
    // End DOM method /setJqueryMap/
	
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /initModule/
    // Purpose : Initializes module, cashes DOM

    initModule = function($container) {
        stateMap.$container = $container;
        $container.append(footerTmpl);
        setJqueryMap();
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
