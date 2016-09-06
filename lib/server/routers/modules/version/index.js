import {query, mutation} from 'redirect-graphql';
var multer = require('multer');
var path = require('path');
var fs = require('fs');

module.exports = {
    register(router) {
        router.subPost('/uploadVersion', multer({dest: 'public/versions/'}).single('file'), (req, res)=>{
            const {file} = req;
            const filePath = file.path.replace(new RegExp(file.filename+'$'), file.originalname);
            fs.renameSync(file.path, filePath);
            router.sendObj(res, {success: true});
        });
    }
}
