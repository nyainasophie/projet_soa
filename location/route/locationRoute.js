module.exports = app => {
    const locations = require("../controller/locationController.js");
  
    var router = require("express").Router();
  
    // Create a new locations
    router.post("/", locations.create);
  
    // Retrieve all locations
    router.get("/location", locations.findAll);
  
    // Retrieve a single locations with id
    router.get("/:id", locations.findOne);
  
    // Update a locations with id
    router.put("/:id", locations.update);
  
    // Delete a locations with id
    router.delete("/:id", locations.delete);
  
    // Delete all locations
    router.delete("/", locations.deleteAll);
    
    app.use('/locations', router);
  };