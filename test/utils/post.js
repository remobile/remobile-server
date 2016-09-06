var http = require('http');

module.exports = (api, param)=>{
    var paramString = param ? JSON.stringify(param): '';
    var headers = {
        'Content-Type': "application/json",
        'Accept': "application/json",
        'Content-Length': paramString.length,
    };
    var options = {
        host: 'localhost',
        port: 3000,
        path: '/app/api/'+api,
        method: 'POST',
        headers: headers
    };

    var req=http.request(options, (res)=>{
        res.setEncoding('utf-8');
        var result = '';
        res.on('data', (data)=>{
            result += data;
        });
        res.on('end', ()=>{
            console.log('success:', result);
        });
        req.on('error', (e)=>{
            console.log('error:', e);
        });
    });
    if (paramString) {
        req.write(paramString);
    }
    req.end();
}
