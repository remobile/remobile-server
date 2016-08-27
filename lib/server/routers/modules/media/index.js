import {query, mutation} from 'redirect-graphql';
var multer = require('multer');
var path = require('path');
var fs = require('fs');

module.exports = {
    register(router) {
        router.post('/api/upload', multer({dest: 'public/media/'}).single('file'), (req, res)=>{
            const {file, body} = req;
            const {taskID, name, discription, time} = body;
            const filePath = file.path+path.extname(file.originalname);
            const url = router.getUploadUrl(filePath);
            fs.renameSync(file.path, filePath);
            mutation({
                fragments: {
                    addUser: {
                        _id: 1,
                        taskID: 1,
                        name: 1,
                        discription: 1,
                        time: 1,
                        url: 1,
                    }
                },
                variables: {
                    addUser: {
                        data: {
                            value: {
                                taskID,
                                name,
                                discription,
                                time,
                                url,
                            },
                            type: 'MEDIA_CREATE_TYPE!'
                        }
                    }
                }
            }).then((data)=>{
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            });
        });
    }
}
