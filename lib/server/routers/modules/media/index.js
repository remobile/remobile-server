import {query, mutation} from 'redirect-graphql';
var multer = require('multer');
var path = require('path');
var fs = require('fs');

module.exports = {
    register(router) {
        router.post('/api/upload', multer({dest: 'public/media/'}).single('file'), (req, res)=>{
            const {file, body} = req;
            const {taskId, name, description, time, type} = body;
            const filePath = file.path+path.extname(file.originalname);
            const url = router.getUploadUrl(filePath);
            fs.renameSync(file.path, filePath);
            mutation({
                fragments: {
                    addMedia: {
                        _id: 1,
                        acceptTaskId: 1,
                        name: 1,
                        description: 1,
                        time: 1,
                        url: 1,
                    }
                },
                variables: {
                    addMedia: {
                        data: {
                            value: {
                                acceptTaskId: taskId,
                                name,
                                description,
                                time,
                                url,
                                type,
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
