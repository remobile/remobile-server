import administrator from './administrator';
import user from './user';
import task from './task';
import test from './test';

export default {
    ...administrator,
    ...user,
    ...task,
    ...test,
};
