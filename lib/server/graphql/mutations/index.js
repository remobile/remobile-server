import administrator from './administrator';
import * as user from './user';
import * as task from './task';
import * as media from './media';
import * as version from './version';

export default {
    ...administrator,
    ...user,
    ...task,
    ...media,
    ...version,
};
