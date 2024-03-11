const { isAuthenticated } = require("./auth");

const recruiterRouteHandler = (
  router,
  field,
  { createHandler, readHandler,readOneHandler,cancelHandler },
) => {
  router.post(`/create/${field}`, isAuthenticated, createHandler);
  router.get(`/read/${field}`, isAuthenticated, readHandler);
  router.get(`/read/${field}/:field_id`, isAuthenticated, readOneHandler);
  router.get(`/cancel/${field}`, isAuthenticated, cancelHandler);
};

module.exports = recruiterRouteHandler;