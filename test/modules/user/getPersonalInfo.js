var post = require('../../utils/post');
var {userId} = require('../../utils/config');

var param = {
    userId,
};

post('getPersonalInfo', param);
