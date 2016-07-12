spa.contributors = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        main_html: "",
        pageId: "contributors",
        title: "Contributors",
        tmplPerInitLoad: 3,
        tmplPerPageLoad: 6
    }, stateMap = {
        $moduleContainer: null ,
        isLoaded: false
    }, jqueryMap = {}, openPage, setJqueryMap, fixStyle, fetchInitContent, initModule;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //------------------- BEGIN UTILITY METHODS ------------------
    // Begin utility method /fixStyle/
    // Purpose : remove the bottom border from the last contributor div
    fixStyle = function(container) {
        var contributors = container.find('.contributor');
        contributors[contributors.length - 1].classList.add('last');
    }
    ;
    // End utility method /fixStyle/
    //-------------------- END UTILITY METHODS -------------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    // purpose: cashes module container and DOM on module opening /openPage/
    //
    setJqueryMap = function() {
        stateMap.$moduleContainer = $('.contributors-container');
        jqueryMap.$contribGallery = stateMap.$moduleContainer.find('ul');
    }
    ;
    // End DOM method /setJqueryMap/
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /openPage/
    // Purpose: checks if the module is already opened, if yes, respons with true, otherwise fetches module data from the database, then renders module templates and appends templates to the container
    openPage = function($container) {
        return new Promise(function(resolve, reject) {
            var i, output = "", limit, renderContent;
            if (!stateMap.isLoaded) {
                httpReq("GET", 'allcontributors').then(function(data) {
                    if (!data.length) {
                        throw new Error("Could not find contributors");
                    }
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
                limit = data.length;
                $container.append(contribContainerTmpl);
                setJqueryMap();
                Mustache.parse(contibGalleryTmpl);
                for (i = 0; i < limit; i++) {
                    if (!data[i]) {
                        continue;
                    }
                    output += Mustache.render(contibGalleryTmpl, data[i].info[0]);
                }
                jqueryMap.$contribGallery.append(output);
                jqueryMap.$contribGallery.addClass('js-contibGallery');
            }
            ;
        }
        )
    }
    ;
    // End public method /openPage/
    // Begin public method /fetchInitContent/
    // Purpose: fetches content for the home page contributors mini-module, then renders templates and appends them to the container
    fetchInitContent = function(container) {
        var i, output = "", renderContent, lim;
        httpReq("GET", 'contributors/' + configMap.tmplPerInitLoad).then(function(data) {
            renderContent(data);
        }).catch(function(error) {
            console.log(error);
        });
        renderContent = function(data) {
            lim = data.length;
            for (i = 0; i < lim; i++) {
                if (!data[i]) {
                    continue;
                }
                output += Mustache.render(contributorsTmpl, data[i].info[0]);
            }
            $(output).appendTo(container);
            fixStyle(container);
        }
    }
    ;
    // End public method /fetchInitContent/
    // Begin public method /initModule/
    // Purpose : cashes DOM and initializes contributors mini-module on home page load 
    initModule = function($container) {
        setJqueryMap();
        fetchInitContent($container);
        return true;
    }
    ;
    // End public method /initModule/
    // return public methods
    return {
        initModule: initModule,
        openPage: openPage,
        configMap: configMap
    };
    //------------------- END PUBLIC METHODS ---------------------
}());
