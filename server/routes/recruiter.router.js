const express = require('express');
const {recruiterResetPassword,uploadImage,updateRecruiterInfo,recruiterSignUp,recruiterSignIn,recruiterSignOut,logedInUser,recruiterPassrest,recruiterPassChanged} = require('../controller/recruiter.controler');
const { isAuthenticated } = require('../middlewares/auth');
const recruiterRouter = express.Router();
const recruiterRouteHandler = require('../middlewares/recruiter.dynamic.route.handler')
const {recruiterJobsHandler,recruiterInternshipHandler} =  require('../controller/recruiter.CRUD.controller');



// Profile page of Loged in User //
recruiterRouter.get('/profile',isAuthenticated,logedInUser)

// Post recruiter Signup //
recruiterRouter.post('/signup',recruiterSignUp);

// Post recruiter Signin //
recruiterRouter.post('/signin',recruiterSignIn);

// Get recruiter SignOut //
recruiterRouter.get('/signout',recruiterSignOut);

// POST send Reset Password link via mail //
recruiterRouter.post("/forgot-password",recruiterPassrest);

// Get password Reset url //
recruiterRouter.get("/forgot-password/:id",recruiterPassChanged);

// POST Change Password logedin User //
recruiterRouter.post("/change-password",isAuthenticated,recruiterResetPassword);

// POST Updateing recruiter data //
recruiterRouter.post("/update",isAuthenticated,updateRecruiterInfo);

// POST Uploading Image using Imagekit //
recruiterRouter.post("/upload-avatar",isAuthenticated,uploadImage);


recruiterRouteHandler(recruiterRouter,"job",recruiterJobsHandler);

recruiterRouteHandler(recruiterRouter,"internship",recruiterInternshipHandler);


module.exports = recruiterRouter;