module.exports = app => {
    const voitures = require("../controller/voitureController.js");
  
    var router = require("express").Router();
  
    // Create a new voiture
    router.post("/", voitures.create);
  
    // Retrieve all voiture
    router.get("/voiture", voitures.findAll);
  
    // Retrieve a single voiture with id
    router.get("/:id", voitures.findOne);
  
    // Update a voiture with id
    router.put("/:id", voitures.update);
  
    // Delete a voiture with id
    router.delete("/:id", voitures.delete);
  
    // Delete all voiture
    router.delete("/", voitures.deleteAll);
    
    app.use('/voitures', router);
  };