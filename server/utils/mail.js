const mailer = require("nodemailer");
const errorHandler = require("../middlewares/errorandler");

const sentMail = (req,res,next,url) => {
  const transport = mailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "JOB App limted",
    to: req.body.email,
    subject: "Reset Password link",
    text: "Password Reset Link for your Job App Account !",
    html: `<a href="${url}"><button>Reset Password</button></a>`,
  };

  transport.sendMail(mailOptions,(err,info) => {
    if (err) return next(new errorHandler(err,500));
console.log(info)
    return res.status(200).json({
        message: `Password Reset Link has been sent to`,
        url,
    })
  })
};


module.exports = {
  sentMail,
}