const path = require('path');

const hashing = require(path.join(__dirname, 'config', 'hashing.js'))
const salt  = require(path.join(__dirname, 'config', 'db.json')).salt


const AWS = require('aws-sdk');
AWS.config.loadFromPath(
    path.join(__dirname, 'config', 'awsConfig.json')
);
    module.exports = {
        needs: () => upload,
        api : {
            sendPw : (req, res) => {
                const body = req.body;
                const hash = hashing.enc(body.id, body.password, salt)
    
                console.log('1. salt 값 : ' , salt)
                console.log('3. hash 결과 : ', hash)
              },
        }
    }

