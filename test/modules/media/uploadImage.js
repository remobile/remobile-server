var upload = require('../../utils/upload');

var defaultOptions = {
    url:'http://localhost:3000/api/uploadMediaFile',
    method: 'POST',
    verbose: true,
    param:'file', //文件上传字段名
    file:'./1.jpg', //文件位置
    fields:{ //其余post字段
        taskId:'57c285a826eda6e70b5d8131',
        name:'test',
        description:'this is a test',
        time:'2016-08-09 12:09:57',
        type: 0,
    }
};

upload(defaultOptions).then(function(data) {
    console.log(data);
    console.log('end');
}, function() {
    console.log('error', arguments);
}, function( progress ) {
    console.log('upload progress', progress);
});
