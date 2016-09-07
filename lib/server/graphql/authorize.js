import UserSessionModel from '../models/userSession';

export function authorize (root) {
    if (!root.administrator) {
        throw new Error('Unauthorized');
    }
}

export function authorizeApi (params) {
    return new Promise((resolve, reject)=>{
        UserSessionModel.findOne({userId: params.userId}).exec((error, doc)=>{
            resolve(!!doc);
        });
    });
}
