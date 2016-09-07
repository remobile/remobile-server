import request from 'superagent';
import Q from 'q';
import config from '../../../../config.js';

// let query1 = `
// {
//     query ($userId0: ID!) {apiGetPersonalInfo(id: $userId0) {
//         ... on errorType { error }
//         ... on personType { name, age }
//     }
// }
// `;

let query1 = `query ($userId0: ID!) { apiGetPersonalInfo (userId: $userId0) {
     ... on errorType { error }
    ... on personType { name, age }
 } }`;

export default function doRequest ({query, variables}) {
    return new Q()
    .then(() => {
        const deferred = Q.defer();
        let promise = deferred.promise;
        console.log({query, variables});
        // query = `query ($userId0: ID!) { apiGetPersonalInfo (userId: $userId0) { phone,name,email } }`;
        const payload = {query:query1, variables};

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
