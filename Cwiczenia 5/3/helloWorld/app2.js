// Application using the 'Pug' template system
const express = require('express');
const logger = require('morgan');
const {computed, compute, getOperation} = require('./script');
const app = express();
const {MongoClient, Double} = require('mongodb');
const url = 'mongodb://localhost:27017/';
const x = 1;
const y = 2;

// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

MongoClient.connect(url, (err, db) => {
    if (err) {
        throw err;
    }
    const dbo = db.db('operations');
    dbo.dropCollection('operations2').catch(reason => console.log(reason));
    dbo.createCollection('operations2');
    const collection = dbo.collection('operations2');

    // Route definitions
    app.get('/', (req, res) => {      // The first route
        res.render('operation', {pretty:true, x:x, y:y, operation: '+', result: x + y}); // Render the 'index' view in 'pretty' mode — the resulting HTML code will be indented — the 'pretty' option has the 'deprecated' status — in the future it will not be supported
        //res.render('index '); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
    });

    app.get('/json/:name', (req, res) => {
        const json = require(`./json/${req.params.name}`);
        module.exports.test.json2 = json;
        res.render('table', {pretty: true, json: computed(json)});
    })

    app.get('/calculate/:operation/:x/:y', (req, res) => {
        const {operation, x, y} = req.params;
        const op = getOperation(operation);
        res.render('operation', {
            pretty: true,
            x: Number(x),
            y: Number(y),
            operation: op,
            result: compute(op, Number(x), Number(y)),
        });
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
                for (const item of items) {
                    const {operation, x, y} = item;
                    item.result = compute(operation, x, y); 
                }
                res.render('table', {json: items});
            });
    });

    // The application is to listen on port number 3001
    app.listen(3001, function () {
        console.log('The application is available on port 3001');
    });
});

module.exports.test = {x2: x, y2: y};
