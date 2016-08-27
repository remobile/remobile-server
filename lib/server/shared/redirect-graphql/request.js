import request from 'superagent';
import Q from 'q';
import config from '../../../../config.js';

export default function doRequest ({query, variables}) {
    return new Q()
    .then(() => {
        const deferred = Q.defer();
        let promise = deferred.promise;
        const payload = {query, variables};

        const req = request
        .post(`http://localhost:${config.port}/graphql`)
        .set({
            'Content-Type': "application/json",
            'Accept': "application/json",
        })
        .send(payload);

        req.end((error, res) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(res.body);
            }
        });

        return promise;
    });
}
