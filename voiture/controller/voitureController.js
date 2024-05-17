const db = require("../model/index");
const Voiture = db.voitures;
const Op = db.Sequelize.Op;

// creer et enregistrer une nouvelle voitures
exports.create = (req, res) => {
    if (!req.body.Nom_Voiture|| !req.body.Type|| !req.body.Matricule|| !req.body.NombrePlace|| !req.body.PrixLocation) {
        res.status(400).send({
          message: "Le contenu ne peut pas être vide !"
        });
        return;
      }
    
      // Création voitures
      const voiture = {
        Nom_Voiture: req.body.Nom_Voiture,
        Type: req.body.Type,
        Matricule: req.body. Matricule,
        NombrePlace: req.body.NombrePlace,
        PrixLocation: req.body.PrixLocation,
      };
    
      // Save voiture in the database
      Voiture.create(voiture)
        .then(() => {
          res.send({
            message: 'Voiture ajouter avec succèe'
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la création d'une voiture."
          });
        });
};

//Récupérez tous les voitures de la base de données.
exports.findAll = (req, res) => {
    const  Nom_Voiture = req.query. Nom_Voiture;
    var condition =  Nom_Voiture ? {  Nom_Voiture: { [Op.like]: `%${ Nom_Voiture}%` } } : null;
  
    Voiture.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la récupération des voitures."
        });
      });
};

// Trouvez un seul voiture avec un identifiant.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Voiture.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Impossible de trouver la voiture avec l'identifiant=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la récupération de la voiture avec l'identifiant=" + id
        });
      });
};

// Mettre à jour un voiture par l'identifiant dans la requête
exports.update = (req, res) => {
    const id = req.params.id;

    Voiture.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "La voiture a été mis à jour avec succès."
          });
        } else {
          res.send({
            message: `Impossible de mettre à jour la voiture avec l'identifiant=${id}. Peut-être que le voiture n'a pas été trouvé ou que req.body est vide!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la mise à jour du voiture avec l'identifiant=" + id
        });
      });
};

//Supprimer un voiture avec l'identifiant spécifié dans la demande
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Voiture.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "La voiture été supprimé avec succès !"
          });
        } else {
          res.send({
            message: `Impossible de supprimer la voiture avec id=${id}. Peut-être que la voiture n'a pas été trouvé !`
          });
        }
      })
      .catch(err => {
        res.send({
          message: "Impossible de supprimer la voiture avec id=" + id
        });
      });
};

// Supprimez tous les voitures de la base de données.
exports.deleteAll = (req, res) => {
  Voiture.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} La voiture a été supprimé avec succès!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la suppression de tous les voitures."
          });
        });
};

