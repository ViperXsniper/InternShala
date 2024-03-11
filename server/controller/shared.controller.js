const { catchAsyncError } = require("../middlewares/catchAsyncError");
const internshipModel = require("../model/internship.model");
const jobModel = require("../model/job.model");
const recruiterModel = require("../model/recruiter.model");

const getAllJobs = catchAsyncError(async (req, res) => {
  const jobs = await jobModel
    .find()
    .populate({
      path: "recruiter",
      model: recruiterModel,
      select: "logo",
    })
    .sort({ postedAt: -1 });
  return res.json({
    success: true,
    jobs,
  });
});

const getAllInternships = catchAsyncError(async (req, res) => {
  const internships = await internshipModel
    .find()
    .populate({
      path: "recruiter",
      model: recruiterModel,
      select: "logo",
    })
    .sort({ postedAt: -1 });
  return res.json({
    success: true,
    internships,
  });
});

const getJobDetails = catchAsyncError(async (req, res) => {
  const postId = req.params.id;
  const job = await jobModel.findById(postId).populate({
    path: "recruiter",
    model: recruiterModel,
    select: "firstname lastname logo city",
  });
  if (!job) {
    return new Error("Post not found !");
  }
  return res.json({
    success: true,
    job,
  });
});

const getIntershipDetails = catchAsyncError(async (req, res) => {
  const postId = req.params.id;
  const internship = await internshipModel.findById(postId).populate({
    path: "recruiter",
    model: recruiterModel,
    select: "firstname lastname logo city",
  });
  if (!internship) {
    return new Error("Post not found !");
  }
  return res.json({
    success: true,
    internship,
  });
});
module.exports = {
  getAllJobs,
  getAllInternships,
  getIntershipDetails,
  getJobDetails,
};
