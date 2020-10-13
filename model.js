const sequelize = require('./models').sequelize;
sequelize.sync();

const {
    Admin,
    Board,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    api : {
        searchInfo : (body, hash, callback) => {
            Admin.findAll({
                where : { [Op.and]: [{ user_id : body.id, password : hash }] }
            })
            .then(data => {
                callback(data)
              })
              .catch(err => {
                throw err;
              })
        },
    },

    add : {
      board : (body, callback) => {
          Board.create({
              title : body.title,
              contents : body.contents,
              date : new Date(86400000)
          })
          .then(data => {
              callback(true)
          })
          .catch(err => {
              throw err;
          })
      }
  }
}