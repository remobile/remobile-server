import administrator from './administrator';
import * as task from './task';
import * as version from './version';
import * as user from './user';

export default {
  ...administrator,
  ...task,
  ...version,
  ...user,
};
