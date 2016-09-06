import {query, mutation} from 'redirect-graphql';
var multer = require('multer');
var path = require('path');
var fs = require('fs');

module.exports = {
    register(router) {
        router.subPost('/uploadMediaFile', multer({dest: 'public/media/'}).single('file'), (req, res)=>{
            const {file, body} = req;
            const {taskId, userId, name, description, time, type} = body;
            const filePath = file.path+path.extname(file.originalname);
            const url = router.getUploadUrl(filePath);
            const thumb = url;
            fs.renameSync(file.path, filePath);
            mutation({
                fragments: {
                    apiUploadMediaFile: 1,
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
                let result = {success: true, url, thumb};
                router.sendObj(res, result);
            }).catch((err)=>{
                router.sendServerError(res, err);
            });
        });
    }
}
