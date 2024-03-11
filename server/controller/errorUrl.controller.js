const errorHandler = require('../middlewares/errorandler')

exports.errorUrl =  function (req,res,next) {
    next(new errorHandler(`Requested URL is Not Found...${req.url}`,404))
}