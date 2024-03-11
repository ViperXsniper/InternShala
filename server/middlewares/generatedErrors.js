generatedErrors = (err,req,res,next) => {
    const statusCode = err.statusCode || 500;


    if (err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")) {
        err.message = "Email addres already exits !!"
    }

    if (err.name === "TokenExpiredError") {
        err.message = "Session timout please log in again"
    }

    res.status(statusCode).json({
        message: err.message,
        errName: err.name,
        // stack: err.stack,
    })
}

module.exports = generatedErrors;