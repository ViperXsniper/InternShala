const express = require("express");
const { getResume } = require("../controller/resume.controller");
const {
  educationHandler,
  jobsHandler,
  skillHandler,
  detailsHandler,
  courseHandler,
  accomHandler,
  responsHandler,
  projectHandler,
  internshipHandler,
} = require("../controller/candidate.resume.CRUD.controller");
const { isAuthenticated } = require("../middlewares/auth");
const routeHandler = require("../middlewares/resume.dynamic.route.handler");
const resumeRouter = express.Router();

// GET Home page //
resumeRouter.get("/", isAuthenticated, getResume);

// Education CRUD Routes //
routeHandler(resumeRouter, "education", educationHandler);

// Jobs CRUD Routes //
routeHandler(resumeRouter, "job", jobsHandler);

// Skills CRUD  //
routeHandler(resumeRouter, "skill", skillHandler);

// Projects CRUD  //
routeHandler(resumeRouter, "project", projectHandler);

// PersonalDetails CRUD  //
routeHandler(resumeRouter, "personalDetail", detailsHandler);

// Responsibilties CRUD  //
routeHandler(resumeRouter, "responsibilitie", responsHandler);

// Accomplishments CRUD  //
routeHandler(resumeRouter, "accomplishment", accomHandler);

// Courses CRUD  //
routeHandler(resumeRouter, "course", courseHandler);

// Internships CRUD  //
routeHandler(resumeRouter, "internship", internshipHandler);

module.exports = resumeRouter;
