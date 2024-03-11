const mongoose = require("mongoose");

const jobModel = mongoose.Schema({
  OrgName: {
    type: String,
    required: [true, "Organisation name is required !"],
  },
  jobTitle: {
    type: String,
    required: [true, "Please Fill job Title..."],
  },
  location: {
    type: String,
    enum: ["In Office", "Remote", "Hybrid"],
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    required: [true, "Email can not be Empty !!"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
  },
  openings: Number,
  description: String,
  preferences: String,
  salary: Number,
  skills: {
    type: Array,
    required: [true, "Skills can not be left empty !"],
  },
  perks: Array,
  assessments: String,
  postedAt: {
    type: Date,
    default: Date.now,
  },
  applications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "applicationModel" },
  ],
  recruiter: [{ type: mongoose.Schema.Types.ObjectId, ref: "recruiterModel" }],
});

module.exports = mongoose.model("jobModel", jobModel);
