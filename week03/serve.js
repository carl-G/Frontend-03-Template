const http=require('http');

http.createServer((request,response) =>{
    let body = [];
    request.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on('end', () =>{
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(
            `
            <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              
              <title>极客时间-轻松学习，高效学习-极客邦</title>
              
              
             
            </head>
            <body>
              <div id="app"></div>
             
            </body>
          </html>
          `
        );
    })
}).listen(8088);

console.log('server started')