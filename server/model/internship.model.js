const mongoose = require("mongoose");

const internshipModel = mongoose.Schema({
  OrgName: {
    type: String,
    required: [true, "Organisation name is required !"],
  },
  internshipTitle: {
    type: String,
    required: [true, "Please fill internship title."],
  },
  location: {
    type: String,
    enum: ["In Office", "Remote", "Hybrid"],
  },
  contact: {
    type: String,
    required: true,
  },
  description: String,
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    required: [true, "Email can not be empty !"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
  },
  openings: Number,
  skills: {
    type: Array,
    required: [true, "Skills can not be left empty !"],
  },
  from: String,
  to: String,
  duration: String,
  stipend: {
    status: {
      type: String,
      enum: ["Fixed", "Negotiable", "Performance based", "Unpaid"],
    },
    amount: Number,
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

module.exports = mongoose.model("internshipModel", internshipModel);
