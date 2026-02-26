const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(200); return res.end(); }

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            fs.writeFileSync('f:\\Marketplace\\scraped_products_v2.json', body);
            console.log('Saved ' + Buffer.byteLength(body) + ' bytes.');
            res.writeHead(200);
            res.end('ok');
        });
    } else { res.end('ok'); }
}).listen(9999, () => console.log('Receiver ready on 9999'));
