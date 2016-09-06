var post = require('../../utils/post');

var param = {
    name: 'fang',
    address: '123',
    description: '123',
    reward: 10,
    startTime: '2016-09-27 10:29:10',
    endTime: '2016-09-27 10:29:10'
};
post('addTask', param);
