import administrator from './administrator';
import * as task from './task';
import version from './version';

export default {
  ...administrator,
  ...task,
  ...version,
};
