spa.popular = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        tmplPerInitLoad: 5,
        tmplPerPageLoad: 10,
        pageId: "popular",
        title: "Popular articles"
    }, stateMap = {
        $moduleContainer: null ,
        isLoaded: false
    }, jqueryMap = {}, setJqueryMap, fetchInitContent, openPage, initModule;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function() {
        stateMap.$moduleContainer = $('.popular-container');
        jqueryMap.$header = stateMap.$moduleContainer.find('.module-header');
        jqueryMap.$gallery = stateMap.$moduleContainer.find('ol');
    }
    ;
    // End DOM method /setJqueryMap/
    // Begin DOM method /fetchInitContent/
    // Purpose : appends rubric module to the home page and fills it with content
    // Arguments :
    // *popularPerRequest - number of articles to be loaded
    // *container - append target on the home page
    //
    fetchInitContent = function(container) {
        var i, output = "", renderContent;
        renderContent = function(data) {
            for (i = 0; i < data.length; i++) {
                if (!data[i]) {
                    return;
                }
                output += Mustache.render(popularTmpl, data[i]);
            }
            output = "<ol>" + output + "</ol>";
            container.append(output);
        }
        httpReq("GET", 'popular-top-' + configMap.tmplPerInitLoad).then(function(data) {
            renderContent(data);
        }).catch(function(error) {
            console.log(error);
        })
    }
    ;
    // End DOM method /fetchInitContent/
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /openPage/
    openPage = function($container) {
        return new Promise(function(resolve, reject) {
            var i, output = "", renderContent;
            if (!stateMap.isLoaded) {
                httpReq("GET", 'popular-top-10').then(function(data) {
                    renderContent(data);
                    stateMap.isLoaded = true;
                    resolve(true);
                }).catch(function(error) {
                    reject(error);
                });
            } else if (stateMap.isLoaded) {
                resolve(true);
            }
            renderContent = function(data) {
                $container.append(popularContainerTmpl);
                setJqueryMap();
                Mustache.parse(popularGalleryTmpl);
                for (i = 0; i < data.length; i++) {
                    if (!data[i]) {
                        continue;
                    }
                    output += Mustache.render(popularGalleryTmpl, data[i]);
                }
                jqueryMap.$gallery.append(output);
                stateMap.$moduleContainer.addClass('loaded');
            }
            ;
        }
        );
    }
    ;
    // Begin public method /initModule/
    // Purpose : Initializes module
    // Arguments :
    // * $container the jquery element used by this feature
    // Returns : true
    // Throws : nonaccidental
    //
    initModule = function($container) {
        stateMap.$container = $container;
        fetchInitContent($container);
        return true;
    }
    ;
    // End public method /initModule/
    // return public methods
    return {
        initModule: initModule,
        configMap: configMap,
        openPage: openPage
    };
    //------------------- END PUBLIC METHODS ---------------------
}());
