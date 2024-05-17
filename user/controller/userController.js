const db = require("../model/index");
const Utilisateur = db.utilisateurs;
const Op = db.Sequelize.Op;

// creer et enregistrer une nouvelle utilisateur
exports.create = (req, res) => {
    if (!req.body.Nom_Utilisateur|| !req.body.Motdepass) {
        res.status(400).send({
          message: "Le contenu ne peut pas être vide !"
        });
        return;
      }
    
      // Création utilisateur
      const utilisateur = {
        Nom_Utilisateur: req.body.Nom_Utilisateur,
        Motdepass: req.body.Motdepass,
      };
    
      // Save utilisateur in the database
      Utilisateur.create(utilisateur)
        .then(() => {
          res.send({
            message: 'Utilisateur ajouter avec succèe'
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la création des utilisateur."
          });
        });
};

//Récupérez tous les utilisateurs de la base de données.
exports.findAll = (req, res) => {
    const  Nom_Utilisateur = req.query. Nom_Utilisateur;
    var condition =  Nom_Utilisateur ? {  Nom_Utilisateur: { [Op.like]: `%${ Nom_Utilisateur}%` } } : null;
  
    Utilisateur.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la récupération des utilisateur."
        });
      });
};

// Trouvez un seul utilisateur avec un identifiant.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Utilisateur.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Impossible de trouver l'utilisateur avec l'identifiant=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la récupération de l'utilisateur avec l'identifiant=" + id
        });
      });
};

// Mettre à jour un utilisateur par l'identifiant dans la requête
exports.update = (req, res) => {
    const id = req.params.id;

    Utilisateur.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "L'utilisateur a été mis à jour avec succès."
          });
        } else {
          res.send({
            message: `Impossible de mettre à jour l'utilisateur avec l'identifiant=${id}. Peut-être que l'utilisateur n'a pas été trouvé ou que req.body est vide!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la mise à jour de l'utilisateur avec l'identifiant=" + id
        });
      });
};

//Supprimer un utilisateur avec l'identifiant spécifié dans la demande
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Utilisateur.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "L'utilisateur a été supprimé avec succès !"
          });
        } else {
          res.send({
            message: `Impossible de supprimer l'utilisateur avec id=${id}. Peut-être que l'utilisateur n'a pas été trouvé !`
          });
        }
      })
      .catch(err => {
        res.send({
          message: "Impossible de supprimer l'utilisateur avec id=" + id
        });
      });
};

// Supprimez tous les utilisateur de la base de données.
exports.deleteAll = (req, res) => {
  Utilisateur.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} L'utilisateur a été supprimé avec succès!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la suppression de tous les utilisateur."
          });
        });
};

