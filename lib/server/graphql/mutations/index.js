import administrator from './administrator';
import user from './user';
import * as task from './task';
import * as media from './media';
import version from './version';

export default {
    ...administrator,
    ...user,
    ...task,
    ...media,
    ...version,
};
