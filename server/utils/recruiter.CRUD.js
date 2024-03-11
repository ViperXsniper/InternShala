const recruiterModel = require('../model/recruiter.model');
const jobModel = require('../model/job.model');
const internshipModel = require('../model/internship.model');

const createJob = (field) => async (req,res)=> {
    const activeRecruiter = await recruiterModel.findById(req.id).exec();

    let newRecord;

    if (field === "jobs") {
        newRecord = await new jobModel(req.body).save();
    }
    else if (field === "internships") {
        newRecord = await new internshipModel(req.body).save();
    }    
    
    newRecord.recruiter.push(activeRecruiter.id);
    activeRecruiter[field].push(newRecord.id);
    await activeRecruiter.save()
    await newRecord.save();

    res.json({
        message: "Post Created !",
    })};


// Reading Employemnt Data //
const readJob = (field) => async (req,res) => {
    const recruiter = await recruiterModel.findById(req.id).populate(`${field}`).exec();
    res.json({
        success: true,
        Data:recruiter[field],
    });
}

// Reading One Employemnt Data //
const readOneJob = (field) => async (req,res) => {
    let model;
    if (field === "jobs") {
        model = await jobModel.findById(req.params.field_id).exec();
    }
    else if (field === "internships") {
        model = await internshipModel.findById(req.params.field_id).exec();
    }
    res.json({Data:model});
}

const deleteJob = (field) => async (req,res) => {
    const recruiter = await recruiterModel.findById(req.id).exec();
    const filtered = recruiter[field].filter((itm)=> itm.id !== req.params.uid);
    recruiter[field] = filtered;
    await recruiter.save();
    res.json({
        message: `Job Deleted...`,
    });
};

module.exports = {
    createJob,
    readJob,
    readOneJob,
    deleteJob,
}