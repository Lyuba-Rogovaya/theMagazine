spa.menu = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {}, stateMap = {
        $container: null ,
        menuHeight: null ,
        menuIsRetracted: false
    }, retractMenu, initModule;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //--------------------- BEGIN DOM METHODS --------------------
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    // Begin event handler /retractMenu/
    // Purpose: retracts menu and fixes it on top of the window on page scroll
    retractMenu = function() {
        var $menu = $('nav');
        stateMap.menuHeight = $menu.innerHeight();
        if (stateMap.menuHeight < $(window).scrollTop()) {
            $menu.addClass("fixedNav");
            stateMap.menuIsRetracted = true;
        } else {
            $menu.removeClass("fixedNav");
            stateMap.menuIsRetracted = false;
        }
    }
    ;
    // End event handler /retractMenu/
    //-------------------- END EVENT HANDLERS --------------------
    //-------------------- BEGIN EVENT LISTENERS -----------------
    //-------------------- END EVENT LISTENERS -------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /initModule/
    // Purpose : Initializes module on home page load: cashes DOM, attaches event handlers;
    //
    initModule = function($container) {
        stateMap.$container = $container;
        $container.append(navigationTmpL);
        $(window).on("scroll", retractMenu);
        return true;
    }
    ;
    // End public method /initModule/
    // return public methods
    return {
        initModule: initModule
    };
    //------------------- END PUBLIC METHODS ---------------------
}());
