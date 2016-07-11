/*
 * routes.js - module to provide routing
*/

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var configRoutes;
var db = require("./db");
// ---------------- BEGIN PUBLIC METHODS ------------------
/*
ROUTS which are handled on client side:

/,
#latest
#popular
#contributors
#home

ROUTS which are handled on server side:

/,
/author-page/:authorName,
/articles/:art_name, 
/rubric/:rubricName,
/bottom-articles/:rubric/:exclude,
/featured, 
/secondary-featured, 
/latest/count, 
/latest/:lim, 
/latest/loadmore/:index, 
/contributors/:loadLim, 
/allcontributors, 
/popular-top-:lim, 

*/
configRoutes = function ( app, server ) {
  app.get( '/', function ( request, response ) {
    response.redirect( '/spa.html' );
  });

  app.all( '/', function ( request, response, next ) {
    response.contentType( 'json' );
    next();
  });

  app.get( '/articles/:artTitle',
    function ( request, response,  next  ) {
			    var artTitle = request.params.artTitle;
       var collection = db.get().collection('articles');
							collection.find({"title" : artTitle})
								         .toArray(function(err, docs) {
                     if (err) {
														           return next(err);
														       }
										           if (docs.length === 0){
														           var err = new Error('Article not found.');
                         err.status = 404;
                         return next(err);
													        }
											          response.send(docs);		
						           });
  });
	 	app.get('/bottom-articles/:rubric/:exclude', 
								function (request, response,  next ){
			      var rubricName = request.params.rubric;
				     var excludeArt = request.params.exclude;
				     var artCount = 4;
					    var collection = db.get().collection('articles');
			      collection.find({ "title": {$ne: excludeArt} ,  "rubric" : rubricName } )
									          .limit(artCount)
									          .toArray(function(err, docs){
										            response.send(docs);
									          });
		});
	 app.get('/featured', 
								function (request, response,  next ){
					    var collection = db.get().collection('articles');
			      collection.findOne({"title" : "Article 0"}, function(err, docs){
					      response.send(docs);
										 //next();
				     });
	 });
	 app.get('/secondary-featured', 
								function (request, response,  next ){
					    var collection = db.get().collection('articles');
			      collection.find().skip(0).limit(6).toArray(function(err, docs){
											response.send(docs);
								   //next();							
									});
	 });
 	app.get('/latest/count', 
								function (request, response,  next ){
					    var collection = db.get().collection('articles');
			      collection.find({
										"pub_date" : {
             $gt:  "2016-06-01",
             $lt:  "2016-07-01"
          }})
									.count(function(err, count){
										 response.send({count: count});
									});
		});
	 app.get('/latest/:lim', 
								function (request, response,  next ){
			      var artLoadLim = +request.params.lim;
			      var latestLength = null;
					    var collection = db.get().collection('articles');
			      collection.find({
										"pub_date" : {
             $gt:  "2016-06-01",
             $lt:  "2016-07-01"
          }})
									 .limit(artLoadLim)
								  .sort({"pub_date" : -1})
									 .toArray(function(err, docs){
											response.send(docs);
								   //next();							
									});
		});
 	app.get('/latest/loadmore/:index', 
								function (request, response,  next ){
			      var startFrom = +request.params.index;
					    var collection = db.get().collection('articles');
			      collection.find({
										"pub_date" : {
             $gt:  "2016-06-01",
             $lt:  "2016-07-01"
          }})
									.skip(startFrom)
									.toArray(function(err, docs){
										response.send(docs);
									})
		});
	//find specified number of random authors 
 	app.get('/contributors/:loadLim', 
								function (request, response,  next ){
			      var loadLim = +request.params.loadLim;
					    var collection = db.get().collection('articles');     
									collection.aggregate([
										{
											"$group": 
										  {
													 "_id": 
													{
													  "author_name" : "$author_name"
												 }, 
													"info": 
													{
														"$push" : 
														{ 
															author_name : "$author_name",
															author_link : "$author_link",
															article_link : "$article_link",
															title : "$title", 
															img_src : "$img_src"										
														}
													}
											 }
										}
									], function(err, result){
										// this func generates an array of random authors limited by loadLim
										 var resultLimited = [];
										// generate random number between loadLim and results.length
										 var randCount = Math.floor(Math.random() * (result.length - loadLim)) + loadLim; 

           while(loadLim){
												// pick the last item in info array (this will include info about the latest published article by the author)
												result[randCount].info.splice(0, result[randCount].info.length-1);
												
												// pick specified number of random authors (restricted by loadLim) 
												resultLimited.push(result[randCount]);
												loadLim--;
												randCount--;
											}
										 response.send(resultLimited);
									})
		});
 	app.get('/allcontributors', 
    function (request, response,  next ){
					    var collection = db.get().collection('articles');  
									collection.aggregate([
										{
											"$group": 
										  {
													 "_id": 
													{
													  "author_name" : "$author_name"
												 }, 
													"info": 
													{
														"$push" : 
														{ 
															author_name : "$author_name",
															author_link : "$author_link",
															article_link : "$article_link",
															title : "$title", 
															img_src : "$img_src"										
														}
													}
											 }
										}
									], function(err, result){
										  response.send(result);
									})
		});
 	app.get('/author-page/:authorName', 
    function (request, response,  next ){
			      var authorName = request.params.authorName;
					    var collection = db.get().collection('articles');  
			      collection
										.find({ author_name: authorName}, 
																{article_link : 1,  
																	popularity_rate : 1, 
																	title : 1, rubric: 1, 
																	rubric_link: 1, 
																	img_src: 1, 
																	summary: 1, 
																	author_name: 1, 
																	author_bio: 1,
																	pub_date: 1
										})
									 .toArray(function(err, docs){
              if (err) {
														   return next(err);
														}
										    if (docs.length === 0){
														    var err = new Error('Author not found.');
                  err.status = 404;
                  return next(err);
													 }
											response.send(docs);				
									});
		});
	 app.get('/popular-top-:lim', 
								function (request, response,  next ){
			      var artLoadLim = +request.params.lim;
					    var collection = db.get().collection('articles');
			      collection
										.find({}, {article_link : 1, author_link : 1, author_name : 1, popularity_rate : 1, title : 1, rubric: 1, rubric_link: 1, img_src: 1})
								  .sort({"popularity_rate" : -1})
										.limit(artLoadLim)
									 .toArray(function(err, docs){
											response.send(docs);				
									});
		});
	 app.get('/rubric/:rubricName', 
								function (request, response,  next ){
			      var rubricName = request.params.rubricName,
					    collection = db.get().collection('articles');
									collection.find({ rubric: rubricName}, 
																									{article_link : 1, 
																										popularity_rate : 1, 
																										title : 1, 
																										rubric: 1, 
																										rubric_link: 1, 
																										img_src: 1, 
																										summary: 1, 
																										author_name: 1, 
																										author_link: 1, 
																										pub_date: 1
																			 })
										         .toArray(function(err, docs){
                       if (err) {
																								  return next(err);
																							}
										             if (docs.length === 0){
																								   var err = new Error('Rubric not found.');
                           err.status = 404;
                           return next(err);
																							}
                       response.send(docs);
									          });
		});
	
// ------------------ ERROR HANDLING --------------------
	//handle invalid routs
	app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
 });
	//handle invalid resouse URIs
	app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }

  res.status(404);
  res.send(err.message || '** no unicorns here **');
});
	app.use(function(err, req, res, next) {
  // log the error, treat it like a 500 internal server error
  // maybe also log the request so you have more debug information
  //log.error(err, req);

  // during development you may want to print the errors to your console
  //console.log(err.stack);

  // send back a 500 with a generic message
  res.status(500);
  res.send('oops! something broke');
});
};


module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------