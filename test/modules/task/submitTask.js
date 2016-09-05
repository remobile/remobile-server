var post = require('../../utils/post');
var {userId, taskId} = require('../../utils/config');

var param = {
    userId,
    taskId,
};

post('submitTask', param);
