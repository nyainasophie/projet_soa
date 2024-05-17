module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
          Nom_Client: {
            type: Sequelize.STRING,
            allowNull: false
          },
          Email_Client: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
              isEmail: {message :"utilisez uniquement des adress email"},
            }
          },
          Telephone: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Cin: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          Adresse: {
            type: Sequelize.STRING,
            allowNull: false,
          }
        }, {
          timestamps: true,
          createdAt: 'created',
          updatedAt: 'updated'
        });
  
    return Client;
  };