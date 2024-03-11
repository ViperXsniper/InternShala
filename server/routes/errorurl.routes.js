const express = require('express');
const {errorUrl} = require('../controller/errorUrl.controller')
const errorRouter = express.Router();

errorRouter.get("*",errorUrl);


module.exports = errorRouter;