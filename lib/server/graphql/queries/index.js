import administrator from './administrator';
import user from './user';
import task from './task';
import version from './version';
import test from './test';

export default {
  ...administrator,
  ...user,
  ...task,
  ...version,
  ...test,
};
