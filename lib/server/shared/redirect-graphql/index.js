import {buildQueryAndVariables} from 'relax-fragments';
import request from './request';
import forEach from 'lodash.foreach';

export function query(options) {
    const {types, fragments, variables} = options;
    if (!!types) {
        forEach(fragments, (fragment, key) => {
            let type = types[key];
            if (type) {
                fragments[key] = {['... on '+type]: fragment, '... on errorType':{error: 1}};
            }
        });
    }
    return request(buildQueryAndVariables(fragments, variables, 'query'));
}

export function mutation(options) {
    const {fragments, variables} = options;
    return request(buildQueryAndVariables(fragments, variables, 'mutation'));
}
