spa.rubric = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        pageId: "rubric" ,
        title: null
    }, stateMap = {
        $moduleContainer: null ,
        loadedRubrics: []
    }, jqueryMap = {}, setJqueryMap, openPage, initModule, setConfigMap, checkLoadedRubrics;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //--------------------- BEGIN UTILITY METHODS --------------------
    checkLoadedRubrics = function(rubricName) {
        var i = 0;
        for (i; i < stateMap.loadedRubrics.length; i++) {
            if (stateMap.loadedRubrics[i] === rubricName) {
                return false;
            }
        }
        return true;
    };
    //--------------------- END UTILITY METHODS --------------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function(rubricClassName) {
        stateMap.$moduleContainer = $("." + rubricClassName);
        jqueryMap.$header = stateMap.$moduleContainer.find('.module-header');
    }
    ;
    setConfigMap = function(rubricDbName) {
        configMap.title = rubricDbName;
    }
    // End DOM method /setJqueryMap/
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /openPage/
    openPage = function($container, path) {
        return new Promise(function(resolve, reject) {
            var i, output = "", renderContent, rubricClassName = getClassName(path), rubricDbName = getDbName(path);

            var isNewRubric = checkLoadedRubrics(rubricDbName);
            if (isNewRubric) {
                httpReq("GET", 'rubric/' + rubricDbName)
																    .then(function(data) {
                        stateMap.loadedRubrics.push(rubricDbName);
                        renderContent(data);
                        resolve(true);
                    }).catch(function($error) {
																	      console.log($error);
		                     reject($error);
                    });
            } else {
                resolve(true);
            }
            renderContent = function(data) {
                $(rubricContainerTmpl).addClass(rubricClassName).appendTo($container);
                setConfigMap(rubricDbName);
                setJqueryMap(rubricClassName);
                jqueryMap.$header.html(configMap.title);
                for (i = 0; i < data.length; i++) {
                    if (!data[i]) {
                        continue;
                    }
                    output += Mustache.render(rubricTmpl, data[i]);
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
