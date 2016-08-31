var post = require('../../utils/post');

var param = {
    userId: '57c1bb98ade570d50c46be7f',
    type: 0,
    pageNo: 0,
};

post('getTaskList', param);
