spa.rubric = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        pageId: "rubric",
        title: null
    }, stateMap = {
        $moduleContainer: null ,
        loadedRubrics: []
    }, jqueryMap = {}, setJqueryMap, openPage, initModule, setConfigMap, checkLoadedRubrics;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //--------------------- BEGIN UTILITY METHODS --------------------
    // Begin utility method /checkLoadedRubrics/
    // Purpose: checks if the requested rubric has aleady been opened
    // returns true if is has been opened, false - otherwise
    checkLoadedRubrics = function(rubricName) {
        var i = 0
          , lim = stateMap.loadedRubrics.length;
        for (i; i < lim; i++) {
            if (stateMap.loadedRubrics[i] === rubricName) {
                return false;
            }
        }
        return true;
    }
    ;
    // End utility method /checkLoadedRubrics/
    //--------------------- END UTILITY METHODS --------------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    // purpose: cashes module container and DOM on module opening /openPage/
    //
    setJqueryMap = function(rubricClassName) {
        stateMap.$moduleContainer = $("." + rubricClassName);
        jqueryMap.$header = stateMap.$moduleContainer.find('.module-header');
    }
    ;
    // End DOM method /setJqueryMap/
    // Begin DOM method /setConfigMap/
    // Purpose: cashes current module title 
    setConfigMap = function(rubricDbName) {
        configMap.title = rubricDbName;
    }
    // End DOM method /setConfigMap/
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /openPage/
    // Purpose: checks if the module is already opened, if yes, respons with true, otherwise fetches module data from the database, then renders module templates and appends templates to the container
    openPage = function($container, path) {
        return new Promise(function(resolve, reject) {
            var i, output = "", renderContent, rubricClassName = getClassName(path), rubricDbName = getDbName(path), isNewRubric = checkLoadedRubrics(rubricDbName);
            if (isNewRubric) {
                httpReq("GET", 'rubric/' + rubricDbName).then(function(data) {
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
    // return public methods and configuration properties
    return {
        openPage: openPage,
        configMap: configMap
    };
    //------------------- END PUBLIC METHODS ---------------------
}());
