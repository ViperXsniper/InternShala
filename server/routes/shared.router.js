const { Router } = require("express");
const { getAllJobs, getAllInternships, getJobDetails, getIntershipDetails } = require("../controller/shared.controller");
const sharedRouter = Router()


sharedRouter.get("/jobs",getAllJobs);

sharedRouter.get('/job/:id',getJobDetails);

sharedRouter.get('/internship/:id',getIntershipDetails);

sharedRouter.get("/internships",getAllInternships);



module.exports = sharedRouter;