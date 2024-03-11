const express = require('express');
const {candidateResetPassword,applyInternship,applyJob,uploadImage,updateCandidateInfo,candidateSignUp,candidateSignIn,candidateSignOut,logedInUser,candidatePassrest,candidatePassChanged} = require('../controller/candidate.controller');
const { isAuthenticated } = require('../middlewares/auth');
const candidateRouter = express.Router();


// Profile page of Loged in User //
candidateRouter.get('/profile',isAuthenticated,logedInUser);

// Post candidate Signup //
candidateRouter.post('/signup',candidateSignUp);

// Post candidate Signin //
candidateRouter.post('/signin',candidateSignIn);

// Get candidate SignOut //
candidateRouter.get('/signout',candidateSignOut);

// POST send Reset Password link via mail //
candidateRouter.post("/forgot-password",candidatePassrest);

// Get password Reset url received by user from mail //
candidateRouter.get("/forgot-password/:id",candidatePassChanged);

// POST change Password logedin User //
candidateRouter.post("/change-password",isAuthenticated,candidateResetPassword);

// POST Updateing candidate data //
candidateRouter.post("/update",isAuthenticated,updateCandidateInfo);

// POST Uploading Image using Imagekit //
candidateRouter.post("/upload-avatar",isAuthenticated,uploadImage);

// POST apply for Job //
candidateRouter.post("/apply/job/:job_id",isAuthenticated,applyJob);

// POST apply for Internship //
candidateRouter.post("/apply/internship/:intern_id",isAuthenticated,applyInternship);

module.exports = candidateRouter;