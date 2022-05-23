const doc = 'index.html';
const fs = require('fs');

const onRequest_8080 = (request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(doc, 'utf8', (err, doc) => {
        if (err) throw err;
        response.end(doc);
    });
}

const onRequest_8081 = (request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain", 'Access-Control-Allow-Origin': 'http://localhost:8080' });
    const datetime = new Date();
    const date = `${datetime.getFullYear()}-${String(datetime.getMonth() + 1).padStart(2, '0')}-${String(datetime.getDate()).padStart(2, '0')}`;
    const time = `${datetime.toTimeString().split(' ')[0]}`;
    response.end(`
    <div>
        <span id="date">${date}</span>
        <span id="time">${time}</span>
    </div>
    `);
};

/* ************************************************** */
/* Main block
/* ************************************************** */
const http = require('http');

http.createServer(onRequest_8080).listen(8080);
http.createServer(onRequest_8081).listen(8081);
console.log("The server was started on port 8080 and 8081");
console.log("To stop the server, press 'CTRL + C'");
