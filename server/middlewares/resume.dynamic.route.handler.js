const { isAuthenticated } = require("./auth");

// Daynamic Route Handler for CRUD //
const routeHandler = (
  router,
  field,
  { addHandler, editHandler, deleteHandler }
) => {
  router.post(`/add-${field}`, isAuthenticated, addHandler);
  router.post(`/edit-${field}/:uid`, isAuthenticated, editHandler);
  router.get(`/delete-${field}/:uid`, isAuthenticated, deleteHandler);
};

module.exports = routeHandler;
