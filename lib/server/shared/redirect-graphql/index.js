import {buildQueryAndVariables} from 'relax-fragments';
import request from './request';

export function query(options) {
    const {fragments, variables} = options;
    return request(buildQueryAndVariables(fragments, variables, 'query'));
}

export function mutation(options) {
    const {fragments, variables} = options;
    return request(buildQueryAndVariables(fragments, variables, 'mutation'));
}
