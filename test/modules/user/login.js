var post = require('../../utils/post');

var param = {
    phone: '18085192480',
    password: '123456',
};

post('login', param);
