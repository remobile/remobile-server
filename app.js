import 'babel-polyfill';

import mongoose from 'mongoose';

import app from './lib/server';
import config from './config';
import logger from './lib/server/logger';

// Connect mongoose
if (!config.db) {
  throw new Error('Configuration to MongoDB required');
}
mongoose.Promise = global.Promise; // Use native promises
mongoose.connect(config.db.uri, config.db);


const server = app.listen(config.port, () => {
  const port = server.address().port;
  logger.debug('Listening at port', port);
});
