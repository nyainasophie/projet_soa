module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          Nom_Utilisateur: {
            type: Sequelize.STRING,
            allowNull: false
          },
          Motdepass: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          
        }, {
          timestamps: true,
          createdAt: 'created',
          updatedAt: 'updated'
        });
  
    return Utilisateur;
  };