import {
    GraphQLUnionType,
} from 'graphql';
import _ from 'lodash';
import {errorType} from '../../graphql/types/error';

export default function bindErrorType(obj) {
    let key = _.keys(obj)[0];
    let type = obj[key];
    return new GraphQLUnionType({
        name: key+'BindErrorType',
        types: [type, errorType],
        resolveType: (value) => {
            if (value.error) {
                return errorType;
            }
            return type;
        },
    });
}
