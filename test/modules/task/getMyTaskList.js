var post = require('../../utils/post');

var param = {
    userId: '57c794e2debc69eec91061da',
    type: 0,
    pageNo: 0,
};

post('getMyTaskList', param);
