var post = require('../../utils/post');
var {userId} = require('../../utils/config');

var param = {
    userId,
    oldPassword: '123',
    newPassword: '123456',
};

post('modifyPassword', param);
