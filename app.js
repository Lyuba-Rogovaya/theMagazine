// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  http    = require( 'http'     ),
  express = require( 'express'  ),
  routes  = require( './routes' ),
  db      = require('./db'),
  app     = express(),
  server  = http.createServer( app );
// ------------- END MODULE SCOPE VARIABLES ---------------

// ------------- BEGIN SERVER CONFIGURATION ---------------
app.configure( function () {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( express.static( __dirname + '/public' ) );
  app.use( app.router );
});

app.configure( 'development', function () {
  app.use( express.logger() );
  app.use( express.errorHandler({
    dumpExceptions : true,
    showStack      : true
  }) );
});

app.configure( 'production', function () {
  app.use( express.errorHandler() );
});

db.connect('mongodb://localhost:27017/theMagazine', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.' + err)
    process.exit(1)
  } else {
    server.listen(3000, function() {
      console.log(
								'Express server listening on port %d in %s mode',
									server.address().port, app.settings.env
						);
    })
  }
})

routes.configRoutes( app, server );
