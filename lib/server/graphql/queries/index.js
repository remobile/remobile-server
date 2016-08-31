import administrator from './administrator';
import user from './user';
import * as task from './task';
import version from './version';

export default {
  ...administrator,
  ...user,
  ...task,
  ...version,
};
