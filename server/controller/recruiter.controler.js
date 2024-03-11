const { catchAsyncError } = require("../middlewares/catchAsyncError");
const errorHandler = require("../middlewares/errorandler");
const recruiterModel = require("../model/recruiter.model");
const { getToken } = require("../utils/Token");
const { createJob, readJob,readOneJob,deleteJob} = require("../utils/recruiter.CRUD");
const { sentMail } = require("../utils/mail");
const imagekit = require('../utils/imagekit').imgkitinitilize();
const path = require("path");


const recruiterSignUp = catchAsyncError(async (req, res) => {
  const recruiter = await new recruiterModel(req.body).save();
  getToken(recruiter, 201, res);
});

const recruiterSignIn = catchAsyncError(async (req, res, next) => {
  
  const recruiter = await recruiterModel
    .findOne({ email: req.body.email }, { email: 1 })
    .select("+password")
    .exec();

  if (!recruiter) {
    return next(
      new errorHandler("recruiter with this email addres not found...", 404)
    );
  }

  const isAuthorized = recruiter.comparePassword(req.body.password);

  if (!isAuthorized) return next(new errorHandler("Invalid password...", 401));

  getToken(recruiter, 200, res);
});

const recruiterSignOut = catchAsyncError(async (req, res) => {
  res.clearCookie('token');
  res.json({
    message: "Successfully signout !!"
  })
});

const logedInUser = catchAsyncError(async (req,res)=>{
  const recruiter = await recruiterModel.findById(req.id).exec();
  res.json(recruiter);
});

const recruiterPassrest = catchAsyncError(async (req,res,next)=>{
  const recruiter = await recruiterModel.findOne({email:req.body.email}).exec();

  if (!recruiter) {
  return next(new errorHandler("email not found ",404));
  }

  const url = `${req.protocol}://${req.get("host")}/recruiter/forgot-password/${recruiter._id}`;

  sentMail(req,res,next,url);
  recruiter.passwordResetFlag = true;
  await recruiter.save();
  res.json({
    recruiter,url
  });
});

const recruiterPassChanged = catchAsyncError(async (req,res,next)=>{
  const recruiter = await recruiterModel.findById(req.params.id).exec();

  if (!recruiter) {
    next(new errorHandler("Invalid URL",404));
  }

  if (recruiter.passwordResetFlag) {
  recruiter.passwordResetFlag = false;
  recruiter.password = req.body.password;
}
else {
  return next(new errorHandler("Invalid link please try again !",500));
}
await recruiter.save();
res.status(200).json({message:"Your Password has been successfully changed !"});
})

const recruiterResetPassword = catchAsyncError(async (req,res)=>{
  const recruiter = await recruiterModel.findById(req.id).exec();

  recruiter.password = req.body.password;
  await recruiter.save();
  getToken(recruiter, 201, res);
})

const updateRecruiterInfo = catchAsyncError(async (req,res)=>{
  await recruiterModel.findByIdAndUpdate(req.id,req.body).exec();
  res.json({
    message: "recruiter Information Updated !",
  });
});

const uploadImage = catchAsyncError(async (req,res) => {
  const recruiter = await recruiterModel.findById(req.id).exec();
  const file = req.files.logo;
  const modifiedFileName = `recruiter-logo-${recruiter.id}${Date.now()}${path.extname(file.name)}`;

  if (recruiter.logo.fileId !== "" ) {
    await imagekit.deleteFile(recruiter.logo.fileId);
  };

const {fileId,url} = await imagekit.upload({
  file: file.data,
  fileName: modifiedFileName,
});

recruiter.logo = {fileId,url};

await recruiter.save();

res.status(200).json({
  message: 'Image Uploaded...',
});
});

const recruiterCreateJob = catchAsyncError(createJob("jobs"));
const recruiterCreateIntern = catchAsyncError(createJob("internships"));

const recruiterReadJob = catchAsyncError(readJob('jobs'));
const recruiterReadIntern = catchAsyncError(readJob('internships'));

const recruiterReadOneJob = catchAsyncError(readOneJob('jobs'));
const recruiterReadOneIntern = catchAsyncError(readOneJob('internships'));

const recruiterDeleteJob = catchAsyncError(deleteJob('jobs'));
const recruiterDeleteIntern = catchAsyncError(deleteJob('internships'));


module.exports = {
  uploadImage,
  updateRecruiterInfo,
  recruiterPassChanged,
  recruiterSignUp,  
  recruiterSignIn,
  recruiterSignOut,
  recruiterPassrest,
  logedInUser,
  recruiterResetPassword,
  recruiterCreateIntern,
  recruiterCreateJob,
  recruiterDeleteIntern,
  recruiterDeleteJob,
  recruiterReadIntern,
  recruiterReadJob,
  recruiterReadOneIntern,
  recruiterReadOneJob,
};
