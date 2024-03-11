const jwt = require("jsonwebtoken");
const { catchAsyncError } = require("./catchAsyncError");
const errorHandler = require("./errorandler");

const isAuthenticated = catchAsyncError(async (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return next(new errorHandler("Signin Required. Please SignIn !", 401));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRATE);
    req.id = id;
    next();
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling
    next(new errorHandler("Invalid token", 401));
  }
});

module.exports = {
  isAuthenticated,
};
