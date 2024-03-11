const {recruiterCreateIntern,recruiterReadOneJob,recruiterReadOneIntern,recruiterCreateJob,recruiterDeleteIntern,recruiterDeleteJob,recruiterReadIntern,recruiterReadJob} =  require('./recruiter.controler')


const recruiterJobsHandler = {
    createHandler: recruiterCreateJob,
    readHandler: recruiterReadJob,
    readOneHandler: recruiterReadOneJob,
    cancelHandler: recruiterDeleteJob,
}

const recruiterInternshipHandler = {
    createHandler: recruiterCreateIntern,
    readHandler: recruiterReadIntern,
    readOneHandler: recruiterReadOneIntern,
    cancelHandler: recruiterDeleteIntern,
};

module.exports = {
    recruiterJobsHandler,
    recruiterInternshipHandler,
}