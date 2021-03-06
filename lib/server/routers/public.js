import {Router} from 'express';
import config from '../../../config.js';
import modules from './modules';
import des from 'des';

const publicRouter = new Router();

publicRouter.getBody = (req)=>{
    if (!req.body.userId) {
        req.body.userId = req.body.phone;
    }
    return req.body;
};
publicRouter.getUploadUrl = (path)=>{
    const {host, port} = config;
    return path.replace(/^public/, 'http://'+host+':'+port);
}
publicRouter.send = (res, str)=>{
    res.send(str);
};
publicRouter.sendServerError = (res, error)=>{
    publicRouter.sendObj(res, {success: false, msg: '服务器错误', error});
};
publicRouter.sendFile = (res, filename)=>{
    publicRouter.send(res, fs.readFileSync(filename, 'utf8'));
};
publicRouter.sendObj = (res, obj)=>{
    publicRouter.send(res, JSON.stringify(obj));
};

publicRouter.subPost = function(url, ...params) {
    publicRouter.post('/app/api'+url, params);
};

modules.map((m)=>{
    m.register(publicRouter);
})

export default publicRouter;
