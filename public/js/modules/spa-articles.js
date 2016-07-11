spa.articles = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        pageId: "article",
					   title : null
    }, stateMap = {
        $moduleContainer: null,
        loadedArticles : []
    }, jqueryMap = {
        imgs: null
    }, openPage, loadImages, showBottomArticles, artAvailable, setJqueryMap, setConfigMap, checkLoadedArticles;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //------------------- BEGIN UTILITY METHODS ------------------
	   checkLoadedArticles = function(artTitle) {
        var i = 0;
        for (i; i < stateMap.loadedArticles.length; i++) {
            if (stateMap.loadedArticles[i] === artTitle) {
                return false;
            }
        }
        return true;
    };
    //-------------------- END UTILITY METHODS -------------------
    //--------------------- BEGIN DOM METHODS --------------------
	   setJqueryMap = function(artTitle) {
        stateMap.$moduleContainer = $('.' + artTitle);
					   jqueryMap.$header = stateMap.$moduleContainer.find('.module-header');
        jqueryMap.$bottomArt =  stateMap.$moduleContainer.find('.bottom-articles ul');
    };

    setConfigMap = function(artTitle) {
        configMap.title = artTitle;
    }
    // End DOM method /setJqueryMap/
    showBottomArticles = function(thisRubric, excludeThisArt) {
        // find other articles related to the rubric of a selected article; exclude selected article from search
        httpReq("GET", "bottom-articles/" + thisRubric + "/" + excludeThisArt).then(// success handler
        function(data) {
            var output = ""
              , i = 0
              , lim = data.length;
            for (i; i < lim; i++) {
                if (!data[i]) continue;
													   output += Mustache.render(bottomArcticesTmpl, data[i]);
            }
            $(output).appendTo(jqueryMap.$bottomArt);
        }, // error handler
        function(error) {
            console.log(error);
        })
    }
    //---------------------- END DOM METHODS ---------------------

    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /openArticle/
    openPage = function($container, artPath) {
        return new Promise(function(resolve, reject) {
            var i, output = "", renderContent, thisRubric, excludeThisArt, artClassName = getClassName(artPath), artDbName = getDbName(artPath), isNewArticle = checkLoadedArticles(artDbName);
									
            renderContent = function(data) {
                $(articleContainerTmpl).addClass(artClassName).appendTo($container);
                setConfigMap(artDbName);
                setJqueryMap(artClassName);
													
                output = Mustache.render(articleTmpl, data);
                $(output).insertAfter(jqueryMap.$header);
            }
            ;
            if (isNewArticle) {
                httpReq("GET", /articles/ + artDbName).then(function(data) {
																	   // cash the rubric of the current article to filter bottom article by this rubric
                    thisRubric = data[0].rubric;
                    // current article will be excluded from the bottom articles results
                    excludeThisArt = data[0].title;
                    renderContent(data[0]);
																	   stateMap.loadedArticles.push(artDbName);
                }).then(function() {
																	// find articles filtered by thisRubric and exclude current article
                    showBottomArticles(thisRubric, excludeThisArt);
                    resolve(true);
                }).catch(function($error) {
																	   console.log($error);
                    reject($error);
                })
            } else if (!isNewArticle) {
                resolve(true);
            }
        }
        );
    }
    // return public methods
    return {
        openPage: openPage,
        configMap: configMap
    };
    //------------------- END PUBLIC METHODS ---------------------
}());
