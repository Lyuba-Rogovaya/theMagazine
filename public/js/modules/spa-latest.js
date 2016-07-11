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
        imgs: null ,
        $button: null ,
        $header: null
    }, fetchInitContent, openPage, loadMoreArt, initModule, showMoreArticles, setJqueryMap, artAvailable, artLoaded = 0, updateButtonText;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //------------------- BEGIN UTILITY METHODS ------------------
    updateButtonText = function(artAvailable) {
        if (artAvailable === 0) {
            jqueryMap.$button.html("All articles were loaded");
        } else if (artAvailable === 1) {
            jqueryMap.$button.html(artAvailable + " article left");
        } else {
            jqueryMap.$button.html(artAvailable + " articles left");
        }
    }
    //-------------------- END UTILITY METHODS -------------------
    //--------------------- BEGIN DOM METHODS --------------------
    setJqueryMap = function() {
        stateMap.$moduleContainer = $('.latest-container');
        jqueryMap.$button = stateMap.$moduleContainer.find('.button');
        jqueryMap.$header = stateMap.$moduleContainer.find('.module-header');
        jqueryMap.$btnWrapper = stateMap.$moduleContainer.find('.button-wrapper');
    }
    ;
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
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
    showMoreArticles = function(e) {
        loadMoreArt();
    }
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /openPage/
    // Purpose: fetch data from the server and update the module view
    // Arguments: articlesPerRequest, number
    //            container, jQuery object
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
    // Purpose : Initializes module
    // Arguments :
    // * $container the jquery element used by this feature
    // Returns : true
    // Throws : nonaccidental
    //
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
