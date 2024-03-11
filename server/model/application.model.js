const mongoose = require("mongoose");

const applicationModel = new mongoose.Schema({
  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "internshipModel",
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobModel",
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "candidateModel",
  },
  assessmentAnswer: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("applicationModel", applicationModel);
