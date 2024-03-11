const {  // Adding //
    addCourse,
    addinternships,
    addEducation,
    addjobs,
    addDetails,
    addProjects,
    addSkills,
    addRes,
    addAccom,
  
    // Edit
    editEducation,
    editCourse,
    editProjects,
    editRes,
    editjobs,
    editSkills,
    editDetails,
    editinternships,
    editAccom,
    // Delete
    deleteEducation,
    deleteAccom,
    deleteDetails,
    deletejobs,
    deleteProjects,
    deleteSkills,
    deleteinternships,
    deleteRes,
    deleteCourse,} = require('./resume.controller');

const educationHandler = {
    addHandler: addEducation,
    editHandler: editEducation,
    deleteHandler: deleteEducation,
  };
  
  const jobsHandler = {
    addHandler: addjobs,
    editHandler: editjobs,
    deleteHandler: deletejobs,
  };
  
  const internshipHandler = {
    addHandler: addinternships,
    editHandler: editinternships,
    deleteHandler: deleteinternships,
  };
  
  const detailsHandler = {
    addHandler: addDetails,
    editHandler: editDetails,
    deleteHandler: deleteDetails,
  };
  
  const projectHandler = {
    addHandler: addProjects,
    editHandler: editProjects,
    deleteHandler: deleteProjects,
  };
  
  const skillHandler = {
    addHandler: addSkills,
    editHandler: editSkills,
    deleteHandler: deleteSkills,
  };
  
  const responsHandler = {
    addHandler: addRes,
    editHandler: editRes,
    deleteHandler: deleteRes,
  };
  
  const accomHandler = {
    addHandler: addAccom,
    editHandler: editAccom,
    deleteHandler: deleteAccom,
  };
  
  const courseHandler = {
    addHandler: addCourse,
    editHandler: editCourse,
    deleteHandler: deleteCourse,
};


module.exports = {
    educationHandler,
    jobsHandler,
    skillHandler,
    detailsHandler,
    courseHandler,
    accomHandler,
    responsHandler,
    projectHandler,
    internshipHandler,
}