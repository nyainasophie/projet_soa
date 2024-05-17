const db = require("../model/index");
const Location = db.locations;
const Op = db.Sequelize.Op;

// creer et enregistrer une nouvelle location
exports.create = (req, res) => {
    if (!req.body.NbrJours|| !req.body.Itineraire|| !req.body.DateDebut|| !req.body.DateFin|| !req.body.LieuPriseCharge|| !req.body.LieuRetour|| !req.body.StatuLocation|| !req.body.CoutTotal|| !req.body.idClient|| !req.body.idVoiture) {
        res.status(400).send({
          message: "Le contenu ne peut pas être vide !"
        });
        return;
      }
    
      // Création Location
      const location = {
        NbrJours: req.body.NbrJours,
        Itineraire: req.body.Itineraire,
        DateDebut: req.body.DateDebut,
        DateFin: req.body.DateFin,
        LieuPriseCharge: req.body.LieuPriseCharge,
        LieuRetour: req.body.LieuRetour,
        StatuLocation: req.body.StatuLocation,
        CoutTotal: req.body.CoutTotal,
        idClient: req.body.idClient,
        idVoiture: req.body.idVoiture,
      };
    
      // Save Location in the database
      Location.create(location)
        .then(() => {
          res.send({
            message: 'location ajouter avec succèe'
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la création d'une location."
          });
        });
};

//Récupérez tous les location de la base de données.
exports.findAll = (req, res) => {
    const  Itineraire = req.query. Itineraire;
    var condition =  Itineraire ? {  Itineraire: { [Op.like]: `%${ Itineraire}%` } } : null;
  
    Location.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la récupération des locations."
        });
      });
};

// Trouvez un seul location avec un identifiant.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Location.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Impossible de trouver la location avec l'identifiant=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la récupération de la location avec l'identifiant=" + id
        });
      });
};

// Mettre à jour une location par l'identifiant dans la requête
exports.update = (req, res) => {
    const id = req.params.id;

    Location.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "La location a été mis à jour avec succès."
          });
        } else {
          res.send({
            message: `Impossible de mettre à jour la location avec l'identifiant=${id}. Peut-être que la location n'a pas été trouvé ou que req.body est vide!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la mise à jour du location avec l'identifiant=" + id
        });
      });
};

//Supprimer un location avec l'identifiant spécifié dans la demande
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Location.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "La location été supprimé avec succès !"
          });
        } else {
          res.send({
            message: `Impossible de supprimer la location avec id=${id}. Peut-être que la location n'a pas été trouvé !`
          });
        }
      })
      .catch(err => {
        res.send({
          message: "Impossible de supprimer la location avec id=" + id
        });
      });
};

// Supprimez tous les locations de la base de données.
exports.deleteAll = (req, res) => {
  Location.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} La location a été supprimé avec succès!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la suppression de tous les locations."
          });
        });
};

