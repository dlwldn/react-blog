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
                date : new Date(),
                view_cnt: 0,
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
            let search = "%%";

            if(body.search) {
                search = '%' + body.search + '%';
            }
            
            Board.findAll({
                where : {
                    [Op.or]: {
                    title : {
                        [Op.like] : search
                    },
                    contents : {
                        [Op.like] : search
                    }
                }
                },
                    limit : body.limit,
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

        board_cnt : (body, callback) => {
            let search = "%%";

            if(body.search) {
                search = '%' + body.search + '%';
            }
            Board.count({
                where : {     
                    [Op.or]: {
                    title : {
                        [Op.like] : search
                    },
                    contents : {
                        [Op.like] : search
                    }}
                }
            })
            .then(result => {
              callback(result);
            })
          },

          board_data : (body, callback) => {
            Board.findAll({
                where : { board_id : body.id }
            })
            .then(result => {
                callback(result);
            })
            .catch(err => {
                throw err;
            })
        }
    },

    update : {
        view_cnt : (body, callback) => {
            Board.update({ view_cnt : sequelize.literal('view_cnt + 1')}, {
                where : { board_id : body.id }
            })
            .then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        }
    },
    delete: {
        board : (body, callback) => {
            Board.destroy({
                where : { board_id : body.board_id }
            })
            .then( () => { callback(true) })
            .catch(err => { throw err; })
        }
    }
    
}