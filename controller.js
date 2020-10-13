const path = require('path');
const AWS = require('aws-sdk');

const hashing = require(path.join(__dirname, 'config', 'hashing.js'))
const salt  = require(path.join(__dirname, 'config', 'db.json')).salt
const model = require('./model');

AWS.config.loadFromPath(
    path.join(__dirname, 'config', 'awsConfig.json')
);
    module.exports = {
        needs: () => upload,
        api : {
            sendPw : (req, res) => {
                const body = req.body;
                const hash = hashing.enc(body.id, body.password, salt)
    
                model.api.searchInfo(body, hash, result => {
                    let obj = {};
                    if(result[0]) {
                        obj['suc'] = true;
                        obj['msg'] = '로그인 성공';
        
                      } else {
                        obj['suc'] = false;
                        obj['msg'] = '로그인 실패';
                      }
                      
                      res.send(obj);
                  })

                console.log('1. salt 값 : ' , salt)
                console.log('3. hash 결과 : ', hash)
              },
        },
        add : {
          board : (req, res) => {
            const body = req.body;

            model.add.board(body, result => {
              if(result) {
                res.send(true);
              }
            })
          }
        }
    }

