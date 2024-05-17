module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          NbrJours: {
            type: Sequelize.STRING,
            allowNull: false
          },
          Itineraire: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          DateDebut: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          DateFin: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          LieuPriseCharge: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          LieuRetour: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          StatuLocation: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          CoutTotal: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          idClient: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          idVoiture: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          
        }, {
          timestamps: true,
          createdAt: 'created',
          updatedAt: 'updated'
        });
  
    return Location;
  };