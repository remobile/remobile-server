var post = require('../../utils/post');
var {userId} = require('../../utils/config');

var param = {
    userId,
    oldPassword: '12',
    newPassword: '123',
};

post('modifyPassword', param);
