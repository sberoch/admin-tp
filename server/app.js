var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const middleware = require('./middleware');
var app = express();

const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    securityDefinitions: {
      auth: {
        type: 'apiKey',
        name: 'Authorization'
      }
    },
    security: [{
      auth: []
    }],
    info: {
      version: "1.0.0",
      title: "Pet Rescue",
      description: "Pet Rescue",
      servers: ["http://localhost:5000"]
    }
  },
  apis: ['./docs/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (!process.env.NODE_ENV == 'development') {
  app.use(middleware);
}

var petsRoutes = require('./routes/pet');
var rescuerRoutes = require('./routes/rescuer')

// Route
app.use('/pets', petsRoutes);
app.use('/rescuers', rescuerRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message
  })
});

module.exports = app;
