module.exports = app => {
    const utilisateurs = require("../controller/userController.js");
  
    var router = require("express").Router();
  
    // Create a new utilisateur
    router.post("/", utilisateurs.create);
  
    // Retrieve all utilisateur
    router.get("/utilisateur", utilisateurs.findAll);
  
    // Retrieve a single utilisateur with id
    router.get("/:id", utilisateurs.findOne);
  
    // Update a utilisateur with id
    router.put("/:id", utilisateurs.update);
  
    // Delete a utilisateur with id
    router.delete("/:id", utilisateurs.delete);
  
    // Delete all utilisateur
    router.delete("/", utilisateurs.deleteAll);
    
    app.use('/utilisateurs', router);
  };