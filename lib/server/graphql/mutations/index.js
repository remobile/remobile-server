import administrator from './administrator';
import user from './user';
import task from './task';
import media from './media';
import version from './version';
import test from './test';

export default {
    ...administrator,
    ...user,
    ...task,
    ...media,
    ...version,
    ...test,
};
