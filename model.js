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
                date : new Date()
            })
            .then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        }
    },

    get : {
        board : (body, callback) => {
            Board.findAll({
                limit : (body.page * body.limit),
                offset : (body.page - 1) * body.limit,
                order: sequelize.literal('board_id DESC')
              })
            .then(data => {
                callback(data)
            })
            .catch(err => {
                throw err;
            })
        },

        board_cnt : (callback) => {
            Board.count()
            .then(result => {
              callback(result);
            })
          }
    }
}