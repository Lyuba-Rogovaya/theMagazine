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
    // purpose: cashes module container and DOM on module opening /openPage/
    //
    setJqueryMap = function() {
        stateMap.$moduleContainer = $('.popular-container');
        jqueryMap.$header = stateMap.$moduleContainer.find('.module-header');
        jqueryMap.$gallery = stateMap.$moduleContainer.find('ol');
    }
    ;
    // End DOM method /setJqueryMap/
    // Begin DOM method /fetchInitContent/
    // Purpose: fetches content for the home page popular mini-module, then renders templates and appends them to the container
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
    // Purpose: checks if the module is already opened, if yes, respons with true, otherwise fetches module data from the database, then renders module templates and appends templates to the container
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
    // End public method /openPage/
    // Begin public method /initModule/
    // Purpose : Initializes module on home page load, cashes DOM;
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
