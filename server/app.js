const express = require('express');
const candidateRouter = require('./routes/candidate.router');
const sharedRouter = require('./routes/shared.router.js')
const resumeRouter = require('./routes/resume.router.js');
const recruiterRouter = require('./routes/recruiter.router.js');
const looger = require('morgan')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const session = require('express-session');
const cors = require('cors');
const fileUploader = require('express-fileupload');

// geting form data from body //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS 
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
    next();
  });
  

// File uploader initialization //
app.use(fileUploader());

// Auth Configration //
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SECRATE,
}));

// Logger // 
app.use(looger('tiny',this.route));


// Home Routes //
app.use(sharedRouter);
app.use("/candidate",candidateRouter);
app.use("/resume",resumeRouter);
app.use("/recruiter",recruiterRouter);


// Error handlers //
const generatedErrors = require('./middlewares/generatedErrors');
const errorURL =  require('./routes/errorurl.routes');
app.use(errorURL);
app.use(generatedErrors);


  

// DataBase Connection //
const {connectDatabase} = require('./model/Database.model');
connectDatabase();



module.exports = app;