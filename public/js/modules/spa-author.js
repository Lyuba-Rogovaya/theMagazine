spa.author = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        pageId: "author",
        title: null
    }, stateMap = {
        $moduleContainer: null ,
        loadedAuthors: []
    }, jqueryMap = {}, setJqueryMap, openPage, initModule, setConfigMap, checkLoadedAuthors;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //--------------------- BEGIN UTILITY METHODS --------------------
    checkLoadedAuthors = function(authorName) {
        var i = 0;
        for (i; i < stateMap.loadedAuthors.length; i++) {
            if (stateMap.loadedAuthors[i] === authorName) {
                return false;
            }
        }
        return true;
    }
    //--------------------- END UTILITY METHODS --------------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function(authorClass) {
        stateMap.$moduleContainer = $("." + authorClass + " > .all-work");
        jqueryMap.$header = stateMap.$moduleContainer.find('.module-header');
    }
    ;
    setConfigMap = function(authorName) {
        configMap.title = authorName;
    }
    // End DOM method /setJqueryMap/
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /openPage/
    openPage = function($container, authorPath) {
        return new Promise(function(resolve, reject) { 
            var i, output = "", renderContent, authorName = authorPath.substr(authorPath.indexOf("/") + 1);
									   var authorClass = authorName;
									   if (authorName.indexOf("-") !== -1) {
													authorName = authorName.replace("-", " ");
												}
            var isNewAuthor = checkLoadedAuthors(authorName);
            if (isNewAuthor) {
                httpReq("GET", 'author-page/' + authorName).then(function(data) {
                    stateMap.loadedAuthors.push(authorName);
                    renderContent(data);
                    resolve(true);
                })
																	.catch(function(error) {
                    reject(error);
                });
            } else {
                resolve(true);
            }
            renderContent = function(data) {
													   var authorContainer = Mustache.render(authorContainerTmpl, data[0])
                $(authorContainer).addClass(authorClass).appendTo($container);
                setConfigMap(authorName);
                setJqueryMap(authorClass);
                jqueryMap.$header.html(configMap.title);
                for (i = 0; i < data.length; i++) {
                    if (!data[i]) {
                        continue;
                    }
                    output += Mustache.render(authorTmpl, data[i]);
                }
                stateMap.$moduleContainer.append(output);
            }
            ;
        }
        );
    }
    ;
    // End public method /openPage/
    // return public methods
    return {
        openPage: openPage,
        configMap: configMap
    };
    //------------------- END PUBLIC METHODS ---------------------
}());
