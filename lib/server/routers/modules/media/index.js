import {query, mutation} from 'redirect-graphql';
var multer = require('multer');
var path = require('path');
var fs = require('fs');

module.exports = {
    register(router) {
        router.post('/api/uploadMediaFile', multer({dest: 'public/media/'}).single('file'), (req, res)=>{
            const {file, body} = req;
            const {taskId, userId, name, description, time, type} = body;
            const filePath = file.path+path.extname(file.originalname);
            const url = router.getUploadUrl(filePath);
            const thumb = url;
            fs.renameSync(file.path, filePath);
            mutation({
                fragments: {
                    apiUploadMediaFile: {
                        id: 1,
                        acceptTaskId: 1,
                        name: 1,
                        description: 1,
                        time: 1,
                        url: 1,
                        thumb: 1,
                    }
                },
                variables: {
                    apiUploadMediaFile: {
                        data: {
                            value: {
                                taskId,
                                userId,
                                name,
                                description,
                                url,
                                thumb,
                                time,
                                type,
                            },
                            type: 'mediaInputType!'
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
