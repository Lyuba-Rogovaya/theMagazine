spa.featured = (function() {
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {}, stateMap = {
        $moduleContainer: null ,
    }, fetchContent;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //--------------------- BEGIN DOM METHODS --------------------
	
    // Begin DOM method /fetchContent/
    // Purpose: fetches content for the home page featured mini-module, then renders templates and appends them to the container
    fetchContent = function() {
        var renderContent, output;
        httpReq("GET", "featured").then(function(data) {
            renderContent(data);
        }).catch(function(error) {
            console.log(error);
        });
        renderContent = function(data) {
            Mustache.parse(featuredArtTmpl);
            output = Mustache.render(featuredArtTmpl, data);
            stateMap.$moduleContainer.html(output);
        };
    };
	   // End DOM method /fetchContent/
	
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //-------------------- BEGIN EVENT LISTENERS -----------------
    //-------------------- END EVENT LISTENERS -------------------
    //------------------- BEGIN PUBLIC METHODS -------------------

    // Begin public method /initModule/
    // Purpose : Initializes module, cashes DOM;
    initModule = function($container) {
        stateMap.$moduleContainer = $container;
        fetchContent();
        return true;
    }
    ;
    // End public method /initModule/
	
    // return public methods
    return {
        initModule: initModule,
    };
    //------------------- END PUBLIC METHODS ---------------------
}());
