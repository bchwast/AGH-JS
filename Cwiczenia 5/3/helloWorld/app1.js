const express = require('express');
const logger = require('morgan');
const {getHtmlResponse, getOperation, compute} = require('./script');
const app = express();
const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017/';
const x = 1;
const y = 2;

MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    const dbo = db.db('operations');
    dbo.dropCollection('operations1').catch(reason => console.log(reason));
    dbo.createCollection('operations1');
    const collection = dbo.collection('operations1');

    // Determining the contents of the middleware stack
    app.use(logger('dev'));                         // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
    // app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

    // Route definitions
    app.get('/', function (req, res) {     // The first route
        res.send(`<h1>${x} + ${y} = ${x + y}</h1>`); // Send a response to the browser
    });

    app.get('/json/:name', (req, res) => {
        const json = require(`./json/${req.params.name}`);
        module.exports.test.json1 = json;
        res.send(getHtmlResponse(json));
    });

    app.get('/calculate/:operation/:x/:y', (req, res) => {
        const {operation, x, y} = req.params;
        const op = getOperation(operation);
        res.send(`<h1>${x} ${op} ${y} = ${compute(op, Number(x), Number(y))}</h1>`);
        const doc = {operation: op, x: Number(x), y: Number(y)};
        collection.insertOne(doc, (err, _res) => {
            if (err) {
                throw err;
            }
        });
    });

    app.get('/results', (req, res) => {
        collection
            .find()
            .toArray()
            .then(items => {
                res.send(getHtmlResponse(items));
            });
    });

    // The application is to listen on port number 3000
    app.listen(3000, function () {
        console.log('The application is available on port 3000');
    });
});



module.exports.test = {x1: x, y1: y};
