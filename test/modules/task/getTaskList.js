var post = require('../../utils/post');
var {userId} = require('../../utils/config');

var param = {
    userId,
    type: 0,
    pageNo: 0,
};

post('getTaskList', param);
