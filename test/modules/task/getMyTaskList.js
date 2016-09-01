var post = require('../../utils/post');

var param = {
    userId: '57c6e2a758f3327302b08b19',
    type: 0,
    pageNo: 0,
};

post('getMyTaskList', param);
