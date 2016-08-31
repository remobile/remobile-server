var post = require('../../utils/post');

var param = {
    userId: '57c698b01ee631017897c1cc',
    type: 0,
    pageNo: 0,
};

post('getMyTaskList', param);
