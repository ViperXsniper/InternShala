const { catchAsyncError } = require("../middlewares/catchAsyncError");
const candidateModel = require("../model/candidate.modle");
const {addDets,editDets,deleteDets} = require('../utils/candidate.resume.CRUD');

const getResume = catchAsyncError(async (req, res) => {
  const { resume } = await candidateModel.findById(req.id).exec();
  res.json({ resume });
});

// Dynamic function for adding deatils for each filed //
const addEducation = catchAsyncError(addDets('education'));
const addAccom = catchAsyncError(addDets('accomplishments'));
const addjobs = catchAsyncError(addDets('jobs'));
const addCourse = catchAsyncError(addDets('courses'));
const addinternships = catchAsyncError(addDets('internships'));
const addDetails = catchAsyncError(addDets('personalDetails'));
const addProjects = catchAsyncError(addDets('projects'));
const addSkills = catchAsyncError(addDets('skills'));
const addRes = catchAsyncError(addDets('responsibilities'));

// Dynamic function for adding deatils for each filed //
const editEducation = catchAsyncError(editDets('education'));
const editAccom = catchAsyncError(editDets('accomplishments'));
const editjobs = catchAsyncError(editDets('jobs'));
const editCourse = catchAsyncError(editDets('courses'));
const editinternships = catchAsyncError(editDets('internships'));
const editDetails = catchAsyncError(editDets('personalDetails'));
const editProjects = catchAsyncError(editDets('projects'));
const editSkills = catchAsyncError(editDets('skills'));
const editRes = catchAsyncError(editDets('responsibilities'));

// Delete CRUD Controlers
const deleteEducation = catchAsyncError(deleteDets('education'));
const deletejobs = catchAsyncError(deleteDets('jobs'));
const deleteCourse = catchAsyncError(deleteDets('courses'));
const deleteAccom = catchAsyncError(deleteDets('accomplishments'));
const deleteinternships = catchAsyncError(deleteDets('internships'));
const deleteDetails = catchAsyncError(deleteDets('personalDetails'));
const deleteProjects = catchAsyncError(deleteDets('projects'));
const deleteSkills = catchAsyncError(deleteDets('skills'));
const deleteRes = catchAsyncError(editDets('responsibilities'));



module.exports = {
  // Home 
  getResume,
  // Adding data //
  addinternships,
  addEducation,
  addjobs,
  addDetails,
  addProjects,
  addSkills,
  addRes,
  addAccom,
  addCourse,
  // Edit //
  editEducation,
  editCourse,
  editProjects,
  editRes,
  editjobs,
  editSkills,
  editDetails,
  editAccom,
  editinternships,
  // Delete //
  deleteEducation,
  deleteDetails,
  deleteCourse,
  deletejobs,
  deleteProjects,
  deleteSkills,
  deleteinternships,
  deleteRes,
  deleteAccom
};
