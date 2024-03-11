const { catchAsyncError } = require("../middlewares/catchAsyncError");
const errorHandler = require("../middlewares/errorandler");
const internshipModel = require("../model/internship.model");
const applicationModel = require("../model/application.model");
const jobModel = require("../model/job.model");
const candidateModel = require("../model/candidate.modle");
const { getToken } = require("../utils/Token");
const { sentMail } = require("../utils/mail");
const imagekit = require("../utils/imagekit").imgkitinitilize();
const path = require("path");

const candidateSignUp = catchAsyncError(async (req, res) => {
  const candidate = await new candidateModel(req.body).save();
  getToken(candidate, 201, res);
});

const candidateSignIn = catchAsyncError(async (req, res, next) => {
  let candidate = await candidateModel
    .findOne({ email: req.body.email }, { email: 1 })
    .select("+password")
    .exec();
  if (!candidate) {
    return next(
      new errorHandler("candidate with this email addres not found...", 404)
    );
  }

  const isAuthorized = candidate.comparePassword(req.body.password);

  if (!isAuthorized) {
    return next(new errorHandler("Invalid password...", 401));
  }

  getToken(candidate, 200, res);
});

const candidateSignOut = catchAsyncError(async (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Successfully signout !!",
  });
});

const logedInUser = catchAsyncError(async (req, res) => {
  const candidate = await candidateModel
    .findById(req.id)
    .exec();
  res.json({candidate});
});

const candidatePassrest = catchAsyncError(async (req, res, next) => {
  const candidate = await candidateModel
    .findOne({ email: req.body.email })
    .exec();

  if (!candidate) {
    return next(new errorHandler("email not found ", 404));
  }

  const url = `${req.protocol}://${req.get("host")}/candidate/forgot-password/${
    candidate._id
  }`;

  sentMail(req, res, next, url);
  candidate.passwordResetFlag = true;
  await candidate.save();
  res.json({
    candidate,
    url,
  });
});

const candidatePassChanged = catchAsyncError(async (req, res, next) => {
  const candidate = await candidateModel.findById(req.params.id).exec();

  if (!candidate) {
    next(new errorHandler("Invalid URL", 404));
  }

  if (candidate.passwordResetFlag) {
    candidate.passwordResetFlag = false;
    candidate.password = req.body.password;
  } else {
    return next(new errorHandler("Invalid link please try again !", 500));
  }
  await candidate.save();
  res
    .status(200)
    .json({ message: "Your Password has been successfully changed !" });
});

const candidateResetPassword = catchAsyncError(async (req, res) => {
  const candidate = await candidateModel.findById(req.id).exec();

  candidate.password = req.body.password;
  await candidate.save();
  getToken(candidate, 201, res);
});

const updateCandidateInfo = catchAsyncError(async (req, res) => {
  await candidateModel.findByIdAndUpdate(req.id, req.body).exec();
  res.json({
    message: "candidate Information Updated !",
  });
});

const uploadImage = catchAsyncError(async (req, res) => {
  const candidate = await candidateModel.findById(req.id).exec();
  const file = req.files.avatar;
  const modifiedFileName = `candidate-avatar-${
    candidate.id
  }${Date.now()}${path.extname(file.name)}`;

  if (candidate.avatar.fileId !== "") {
    await imagekit.deleteFile(candidate.avatar.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  candidate.avatar = { fileId, url };

  await candidate.save();

  res.status(200).json({
    message: "Avatar has been Updated...",
  });
});

const applyJob = catchAsyncError(async (req, res, next) => {
  const candidate = await candidateModel.findById(req.id).exec();
  const job = await jobModel.findById(req.params.job_id).exec();
  const newApplication = new applicationModel({
    jobId:job._id,
    candidateId:candidate._id,
    assessmentAnswer:req.body.assessmentAnswer,
    coverLetter:req.body.coverLetter,
    status: "Pending",
  });

  await newApplication.save();

  await jobModel.findByIdAndUpdate(job, {
    $push: { applications: newApplication._id },
  });

  await candidateModel.findByIdAndUpdate(candidate, {
    $push: { appliedJobs: job._id },
  });

  res.json({
    message: "Job application applied...",
  });
});

const applyInternship = catchAsyncError(async (req, res, next) => {
  const candidate = await candidateModel.findById(req.id).exec();
  const intern = await internshipModel.findById(req.params.intern_id).exec();

  const newApplication = new applicationModel({
    internshipId: intern._id,
    candidateId: candidate._id,
    assessmentAnswer: req.body.assessmentAnswer,
    coverLetter: req.body.coverLetter,
    status: "Pending",
  });

  await newApplication.save();

  await internshipModel.findByIdAndUpdate(intern, {
    $push: { applications: newApplication._id },
  });

  await candidateModel.findByIdAndUpdate(candidate, {
    $push: { appliedInternships: intern._id },
  });

  res.json({
    message: "Internship application applied...",
  });
});

module.exports = {
  uploadImage,
  updateCandidateInfo,
  candidatePassChanged,
  candidateSignUp,
  applyJob,
  applyInternship,
  candidateSignIn,
  candidateSignOut,
  candidatePassrest,
  logedInUser,
  candidateResetPassword,
};
