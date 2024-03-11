const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const candidateModel = mongoose.Schema(
  {
    role: {
      type: String,
      default: "candidate",
    },
    firstname: {
      type: String,
      trim: true,
      required: [true, "Can not left Firstname Empty !!"],
      minLength: [3, "Firstname should have at least 3 characters !"],
    },
    lastname: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
    city: {
      type: String,
      required: [true, "City name is Required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Email can not be Empty !!"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxLength: [15, "Password should not exeed more than 15 Charcters !!"],
      minLength: [6, "Password should atlest 6 Charcters !!"],
      required: [true, "Can not left password Empty !!"],
      // match : [,"Password should contain 1 Special Character !!"],
    },
    passwordResetFlag: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: Object,
      default: {
        fileId: "",
        url: "",
      },
    },
    resume: {
      personalDetails: {
        profession:String,
        contact:String,
        about:String,
        location: String,
        linkedin: String,
        github: String,
      },
      education: [
        {
          degree: String,
          university: String,
          graduationYear: String,
        },
      ],
      internships: [
        {
          company: String,
          position: String,
          startDate: Date,
          endDate: Date,
        },
      ],
      jobs: [
        {
          company: String,
          position: String,
          startDate: Date,
          endDate: Date,
        },
      ],
      courses: [{
        title: String,
        instructor: String,
      }],
      projects: [
        {
          title: String,
          description: String,
          link: String,
          technologies:[String],
        },
      ],
      accomplishments: [],
      skills: [
        {
          name: String,
          level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
          },
        },
      ],
    },
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobModel" }],
    appliedInternships: [
      { type: mongoose.Schema.Types.ObjectId, ref: "internshipModel" },
    ],
  },
  { timestamps: true }
);

candidateModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

candidateModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

candidateModel.methods.getWebToken = function () {
  try {
    const token = jwt.sign(
      {
        id: this._id,
      },
      process.env.JWT_SECRATE,
      {
        expiresIn: process.env.JWT_EX_TIME,
      }
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Unable to generate token");
  }
};

module.exports = mongoose.model("candidateModel", candidateModel);
