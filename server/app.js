//------------------------------app------------------------------//
let express = require('express');
const app = express();

let cors = require('cors');
let logger = require('morgan');
let createError = require('http-errors');
const middleware = require('./middleware');
let cookieParser = require('cookie-parser');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
//----------------------------------------------------------------//


//----------------------PUBLIC-ROUTES-----------------------------//
const {usersRoutes, rescuersRoutes, adoptersRoutes} = require('./routes');

app.use('/users', usersRoutes);
app.use('/rescuers', rescuersRoutes);
app.use('/adopters', adoptersRoutes);
//----------------------------------------------------------------//


//---------------------------swagger------------------------------//
let swaggerJsDoc = require("swagger-jsdoc");
let swaggerUi = require("swagger-ui-express");

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
//----------------------------------------------------------------//


//-----------------------------ROUTES-----------------------------//
if (!process.env.NODE_ENV == 'development') app.use(middleware);

const { petsRoutes } = require('./routes');

app.use('/pets', petsRoutes);
//----------------------------------------------------------------//


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
