var express = require('express');
const cors = require('cors');
var path = require('path');
var volleyball = require('volleyball');
// var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var colleges = require('./routes/college')

var swaggerUi = require('swagger-ui-express'); // line 7
var swaggerJSDoc = require('swagger-jsdoc'); // line 8
 

var app = express();

// ...
var options = { // line 27
  swaggerDefinition: {
    info: {
      title: 'swagger-express-jsdoc', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  apis: ['./routes/*'], // Path to the API docs
};
var swaggerSpec = swaggerJSDoc(options); // line 36
 
// ...
app.get('/api-docs.json', function(req, res) { // line 41
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
 
// ...
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(volleyball);
app.use(cors());

// app.get('/api-docs.json', function(req, res) { // line 41
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
// });
   
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/colleges',colleges);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
