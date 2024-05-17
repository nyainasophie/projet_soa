
const db = require("../model/index");
const Client = db.clients;
const Op = db.Sequelize.Op;

// creer et enregistrer une nouvelle client
exports.create = (req, res) => {
    if (!req.body.Nom_Client|| !req.body.Email_Client|| !req.body.Telephone|| !req.body.Cin|| !req.body.Adresse) {
        res.status(400).send({
          message: "Le contenu ne peut pas être vide !"
        });
        return;
      }
    
      // Création client
      const client = {
        Nom_Client: req.body.Nom_Client,
        Email_Client: req.body.Email_Client,
        Telephone: req.body.Telephone,
        Cin: req.body.Cin,
        Adresse: req.body.Adresse,

      };
    
      // Save client in the database
      Client.create(client)
        .then(() => {
          res.send({
            message: ' client ajouter avec succèe'
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la création de client."
          });
        });
};

//Récupérez tous les clients de la base de données.
exports.findAll = (req, res) => {
    const Nom_Client = req.query.Nom_Client;
    var condition = Nom_Client ? { Nom_Client: { [Op.like]: `%${ Nom_Client}%` } } : null;
  
    Client.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la récupération des clients."
        });
      });
};

// Trouvez un seul client avec un identifiant.
exports.findOne = (req, res) => {
    const id = req.params.id;

    Client.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Impossible de trouver le client avec l'identifiant=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la récupération du client avec l'identifiant=" + id
        });
      });
};

// Mettre à jour un client par l'identifiant dans la requête
exports.update = (req, res) => {
    const id = req.params.id;

   Client.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Client a été mis à jour avec succès."
          });
        } else {
          res.send({
            message: `Impossible de mettre à jour le client avec l'identifiant=${id}. Peut-être que le client n'a pas été trouvé ou que req.body est vide!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la mise à jour du client avec l'identifiant=" + id
        });
      });
};

//Supprimer un client avec l'identifiant spécifié dans la demande
exports.delete = (req, res) => {
    const id = req.params.id;

   Client.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Client supprimé avec succès !"
          });
        } else {
          res.send({
            message: `Impossible de supprimer le client avec id=${id}. Peut-être que l'entrée n'a pas été trouvé !`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Impossible de supprimer le client avec id=" + id
        });
      });
};

// Supprimez tous les clients de la base de données.
exports.deleteAll = (req, res) => {
   Client.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Les clients a été supprimé avec succès!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la suppression de tous les clients."
          });
        });
};
