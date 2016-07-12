spa.latest = function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        title: "Latest articles",
        pageId: "latest",
        tmplPerInitLoad: 4,
        tmplPerPageLoad: 8,
    }, stateMap = {
        $initContainer: null ,
        $moduleContainer: null ,
        isLoaded: false
    }, jqueryMap = {
        $button: null ,
        $header: null
    }, fetchInitContent, openPage, loadMoreArt, initModule, showMoreArticles, setJqueryMap, artAvailable, artLoaded = 0, updateButtonText;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //------------------- BEGIN UTILITY METHODS ------------------
    // Begin utility method /updateButtonText/
    // Purpose: updates text on the button to show the number of available latest articles for load
    updateButtonText = function(artAvailable) {
        if (artAvailable === 0) {
            jqueryMap.$button.html("All articles were loaded");
        } else if (artAvailable === 1) {
            jqueryMap.$button.html(artAvailable + " article left");
        } else {
            jqueryMap.$button.html(artAvailable + " articles left");
        }
    }
    // End utility method /updateButtonText/
    //-------------------- END UTILITY METHODS -------------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    // purpose: cashes module container and DOM on module init load /fetchInitContent/ and module opening /openPage/
    //
    setJqueryMap = function() {
        stateMap.$moduleContainer = $('.latest-container');
        jqueryMap.$button = stateMap.$moduleContainer.find('.button');
        jqueryMap.$header = stateMap.$moduleContainer.find('.module-header');
        jqueryMap.$btnWrapper = stateMap.$moduleContainer.find('.button-wrapper');
    }
    ;
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    // Begin event handler /loadMoreArt/
    // Purpose: loads more articles on button click, updates the number of the available articles 
    loadMoreArt = function() {
        var output = "", startFrom = artLoaded, i = 0, limit = i + 4, renderContent;
        if (artAvailable === 0) {
            return;
        }
        httpReq("GET", "latest/loadmore/" + startFrom).then(function(data) {
            renderContent(data);
        }).then(function() {
            loadImages();
        }).catch(function(error) {
            console.log(error);
        });
        renderContent = function(data) {
            Mustache.parse(latestTmpl);
            for (i; i < limit; i++) {
                if (!data[i]) {
                    continue
                }
                ;output += Mustache.render(latestTmpl, data[i]);
                artAvailable -= 1;
                artLoaded += 1;
            }
            $(output).insertBefore(jqueryMap.$btnWrapper);
            updateButtonText(artAvailable);
        }
    }
    ;
    // End event handler /setJqueryMap/
    // Begin event handler /showMoreArticles/
    // Purposes: just for convenience
    showMoreArticles = function(e) {
        loadMoreArt();
    }
    ;
    // End event handler /showMoreArticles/
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
	
    // Begin public method /fetchInitContent/
    // Purpose: fetches content for the home page latest mini-module, then renders templates and appends them to the container
    fetchInitContent = function(articlesPerRequest, container) {
        var i, output = "", renderContent;
        /* fetch module content form the server then update the view*/
        httpReq("GET", "latest/" + articlesPerRequest).then(function(data) {
            renderContent(data);
        });
        renderContent = function(data) {
            Mustache.parse(latestTmpl);
            for (i = 0; i < data.length; i++) {
                if (!data[i]) {
                    continue;
                }
                output = Mustache.render(latestTmpl, data[i]);
                $(output).appendTo(container);
            }
        }
    }
    ;
    // End public method /fetchInitContent/
    // Begin public method /openPage/
    // Purpose: checks if the module is already opened, if yes, respons with true, otherwise fetches module data from the database, then renders module templates and appends templates to the container
    openPage = function($container) {
        return new Promise(function(resolve, reject) {
            var i, output, renderContent;
            if (!stateMap.isLoaded) {
                httpReq("GET", "latest/count").then(function(data) {
                    artAvailable = data.count;
                    return httpReq("GET", "latest/" + configMap.tmplPerPageLoad);
                }).then(function(data) {
                    renderContent(data);
                }).then(function() {
                    artLoaded = configMap.tmplPerPageLoad;
                    jqueryMap.$button.html(artAvailable + " articles left");
                    stateMap.isLoaded = true;
                    resolve(true);
                }).catch(function(error) {
                    reject(error);
                });
            } else {
                resolve(true);
            }
            renderContent = function(data) {
                $container.append(latestContainerTmpl);
                setJqueryMap();
                Mustache.parse(latestTmpl);
                for (i = 0; i < data.length; i++) {
                    if (!data[i]) {
                        continue;
                    }
                    output = Mustache.render(latestTmpl, data[i]);
                    $(output).insertBefore(jqueryMap.$btnWrapper);
                    artAvailable -= 1;
                }
            }
            ;
        }
        );
    }
    ;
    // End public method /openPage/
    // Begin public method /initModule/
    // Purpose : Initializes module, attaches event listeners, cashes DOM
    initModule = function($container) {
        stateMap.$initContainer = $container;
        fetchInitContent(configMap.tmplPerInitLoad, $container);
        setJqueryMap();
        $('body').on("click", '.latest-container .button', showMoreArticles);
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
}();
