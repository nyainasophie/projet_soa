module.exports = app => {
  const clients = require("../controller/clientController.js");

  var router = require("express").Router();

  // Create a new clients
  router.post("/", clients.create);

  // Retrieve all clients
  router.get("/client", clients.findAll);

  // Retrieve a single clients with id
  router.get("/:id", clients.findOne);

  // Update a clients with id
  router.put("/:id", clients.update);

  // Delete a utilisateur with id
  router.delete("/:id", clients.delete);

  // Delete all utilisateur
  router.delete("/", clients.deleteAll);
  
  app.use('/clients', router);
};