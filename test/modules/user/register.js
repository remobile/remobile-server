var post = require('../../utils/post');

var param = {
    phone: '18085192480',
    password: '123',
    email: '42550564@qq.com',
};

post('register', param);
