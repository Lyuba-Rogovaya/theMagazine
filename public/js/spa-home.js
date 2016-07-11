spa.home = (function() {
    'use strict';
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        pageId: "home-page",
        title: "Home page"
    }, jqueryMap = {}, stateMap = {
        // stateMap stores the current module container
        $container: null ,
        pageId: null ,
        anchor: null ,
        anchor_previous: null ,
        anchor_proposed: null
    }, allowed_anchors_map = {}, openNewPage, initModule, onHashchange, artPath, rubricPath, authorPath, notFoundHandler, serverErrorHandler;
    allowed_anchors_map = {
        latest: true,
        home: true,
        contributors: true,
        popular: true,
        articles: true,
        rubric: true,
					   author: true
    };
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //------------------- BEGIN ERROR HANDLERS ------------------
	    notFoundHandler = function($error){
						  var errorMSG = "<p>Our apologies, this is almost certainly not the page you were looking for. Please visit our <a href=\"#home\">home page.</a></p>"
						   jqueryMap.$oops_page.html(errorMSG);
						   jqueryMap.$page_wrapper.hide();
						   jqueryMap.$oops_page.show();
						   
					};
	    
	    serverErrorHandler = function($error){
					   var errorMsg = "Our apologies, server error occured. Please, try again later."
								jqueryMap.$oops_page.html(errorMSG);
						  jqueryMap.$page_wrapper.hide();
						  jqueryMap.$oops_page.show();
					};
    //-------------------- END ERROR HANDLERS -------------------
    //------------------- BEGIN UTILITY METHODS ------------------
    //-------------------- END UTILITY METHODS -------------------
    //--------------------- BEGIN DOM METHODS --------------------
    var setJqueryMap = function() {
        var $container = stateMap.$container;
        stateMap.pageId = $container.attr('id');
        var $containerParent = $container.parents('html');
        jqueryMap = {
            $container: $container,
            $htmlTitle: $containerParent.find('title'),
            $menu: $container.find('.menu-module'),
            $featured: $container.find('.featured-module'),
            $secondaryFeatured: $container.find('.secondary-featured-module'),
            $latest: $container.find('.latest-module'),
            $latestContent: $container.find('.latest-module .content-wrapper'),
            $contributorsContent: $container.find('.contributors-module .content-wrapper'),
            $contributors: $container.find('.contributors-module'),
            $popular: $container.find('.popular-module'),
            $popularContent: $container.find('.popular-module .content-wrapper'),
            $wrapperContrPop: $container.find('.wrapper-contributors-popular'),
            $footer: $container.find('.footer-module'),
            $spa_modules_wrapper: $container.find('.spa-modules-wrapper'),
            $home_page_wrapper: $container.find('.home-page-wrapper'),
									   $oops_page : $container.find('.oops-page'),
									   $page_wrapper : $container.find('.page-wrapper'),
            imgs: null
        };
    }
    ;
    // -----------begin DOM method /openNewPage/ ---------
    //
    // purpose: opens new page on hash change;
    //          updates current page id
    //          updates current page title
    //          appends the module view div to the spa_modules_wrapper section
    openNewPage = function(module_name) {
        var setupModulePage, openPage, modulePath = artPath || rubricPath || authorPath, 
												resourseName = modulePath ? modulePath.substring(modulePath.indexOf("/") + 1) : "", 
												$requestedModule = null , $requestedResourse = null ;
					
        spa[module_name].openPage(jqueryMap.$spa_modules_wrapper, modulePath)
									   .then(function(result) {
                if (result === true) {
                    $requestedModule = jqueryMap.$spa_modules_wrapper.find('.' + module_name + '-container');
                    $requestedResourse = resourseName ? jqueryMap.$spa_modules_wrapper.find('.' + resourseName) : "";
                    setupModulePage();
               }
               }, function($error) {
                   if ($error.status === 404) {
													          notFoundHandler($error);
												       } else {
													          serverErrorHandler($error);
												       }
               }).then(function() {
                   // Loads images within modules when they are accessed indirectly (i.e. via the site link)
                   loadImages();
               });
					
        setupModulePage = function() {
									   jqueryMap.$oops_page.hide();
									   jqueryMap.$page_wrapper.show();
            jqueryMap.$home_page_wrapper.hide();
            stateMap.$container.attr('id', spa[module_name].configMap.pageId);
            jqueryMap.$htmlTitle.html(spa[module_name].configMap.title);
            jqueryMap.$spa_modules_wrapper.show();
            jqueryMap.$spa_modules_wrapper.children().hide();
            if ($requestedResourse) {
                $requestedResourse.show();
                $requestedResourse = null ;
                artPath = rubricPath = authorPath = "";
            } else if ($requestedModule) {
                $requestedModule.show();
                $requestedModule = null ;
                artPath = rubricPath = authorPath = "";
            }
        };
        
    };

    // -----------end DOM method /openNewPage/ ---------
    // ---------- begin DOM method / returnToHomePage / ---------	
    //
    // purpose:  reopens home page; 
    //           updates current page id;
    //           updates current page title;
    var returnToHomePage = function() {
					   jqueryMap.$oops_page.hide();
					   jqueryMap.$page_wrapper.show();
        jqueryMap.$container.attr('id', "home-page");
        jqueryMap.$htmlTitle.html("Home page");
        jqueryMap.$spa_modules_wrapper.children().hide();
        jqueryMap.$spa_modules_wrapper.hide();
        jqueryMap.$home_page_wrapper.show();
        loadImages();
        return true;
    }
    ;
    // ---------- end DOM method / returnToHomePage / ------------
    //---------------------- END DOM METHODS ---------------------
	
    //------------------- BEGIN EVENT HANDLERS -------------------
	
    // Begin Event handler /onHashchange/
    onHashchange = function(event) {
        var is_anchorValid = false, hash;
        if ($(window).scrollTop() !== 0) {
            $(window).scrollTop(0);
        }
        // ---------------------------------------------------
        // -------------- HANDLE NAVIGATION ------------------
        // ---------------------------------------------------
        hash = location.hash.substr(1);
        
					  //first load ? : do nothing let the spa.initModule do the job
        if ((hash == "" || hash == "home") && !stateMap.anchor_previous) {
            return;
        }			
					  // home page requested?
        if (hash == "" || hash == "home") {
            if (hash === "") {
													   hash = "home";
                location.replace("#home");
												}
									   stateMap.anchor_proposed = hash;
            stateMap.anchor_previous = hash;
									   stateMap.anchor = hash;
        } 
					   // other module requested? check anchor validiti
        stateMap.anchor_proposed = hash;
					   /*				
								rubric/, articles/ and contributors/ URIs may be followed by a resource identifier (e.g. article title, rubric or author name),
								therefore a complete URI is cashed in a corresponding variable and then passed to the module httpGet method, which retrieves the resource from the database based on the URI 	 				
								*/
        if (hash.indexOf("rubric/") !== -1) {
            rubricPath = hash;
            stateMap.anchor_proposed = "rubric"
        }
        if (hash.indexOf('articles/') !== -1) {
            artPath = hash;
            stateMap.anchor_proposed = "articles";
        }
        if (hash.indexOf('contributors/') !== -1) {
            authorPath = hash;
            stateMap.anchor_proposed = "author";
        }

					// Anchor valid?
        for (var prop in allowed_anchors_map) {
									   if (allowed_anchors_map.hasOwnProperty(prop)) {
                if (prop === stateMap.anchor_proposed) {
                    is_anchorValid = true;
                    stateMap.anchor = stateMap.anchor_proposed;
                    stateMap.anchor_previous = stateMap.anchor_proposed;
                    break;
                }
												}
        }
        //yes: open page
        if (is_anchorValid) {
            switch (stateMap.anchor_proposed) {
            case "home": returnToHomePage();
                break;
            case "latest":
                openNewPage(stateMap.anchor_proposed);
                break;
            case "contributors":
                openNewPage(stateMap.anchor_proposed);
                break;
            case "popular":
                openNewPage(stateMap.anchor_proposed);
                break;
            case "articles":
                openNewPage(stateMap.anchor_proposed);
                break;
            case "rubric":
                openNewPage(stateMap.anchor_proposed);
                break;
            case "author":
                openNewPage(stateMap.anchor_proposed);
                break;
											 default: stateMap.anchor_previous ? returnToHomePage() : "";
            }
        }
        //no: invoke notFound error handler
        if (!is_anchorValid) {
									   var error = new Error("Invalid anchor.")
            notFoundHandler(error);
        }
        // -------------------------------------------------------
        // -------------- END HANDLE NAVIGATION ------------------
        // -------------------------------------------------------
    }
    ;
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin public method /configModule/
    // 
    // Begin public method /initModule/
    // Purpose : Initializes module
    // Arguments :
    // * $container the jquery element used by this feature
    // Returns : true
    // Throws : nonaccidental
    //
    //------------------- BEGIN PUBLIC METHODS -------------------
    initModule = function($container) {
        stateMap.$container = $container;
        setJqueryMap();
        // initialize feature modules
        spa.menu.initModule(jqueryMap.$menu);
        spa.featured.initModule(jqueryMap.$featured);
        spa.secondaryFeatured.initModule(jqueryMap.$secondaryFeatured);
        spa.latest.initModule(jqueryMap.$latestContent);
        spa.contributors.initModule(jqueryMap.$contributorsContent);
        spa.popular.initModule(jqueryMap.$popularContent);
        spa.footer.initModule(jqueryMap.$footer);
        jqueryMap.imgs = $('img:visible');
        // load images
        setTimeout(loadImages, 500);
        // Loads images within all modules when they are accessed directly (e.g. http://theMagazine#latest)
        $(window).on("hashchange", onHashchange).trigger("hashchange");
        return true;
    }
    ;
    // End public method /initModule/
    // return public methods
    return {
        initModule: initModule
    };
    //------------------- END PUBLIC METHODS -------------------
})();
