module.exports = (sequelize, Sequelize) => {
    const Voiture = sequelize.define("voiture", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          Nom_Voiture: {
            type: Sequelize.STRING,
            allowNull: false
          },
          Type: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Matricule: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          NombrePlace: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          PrixLocation: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        }, {
          timestamps: true,
          createdAt: 'created',
          updatedAt: 'updated'
        });
  
    return Voiture;
  };