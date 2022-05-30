const express = require('express');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const url = 'mongodb://localhost:27017';


MongoClient.connect(url, (err, db) => {
    if (err) {
        throw(err);
    }
    const dbo = db.db('products');
    const products = dbo.collection('products');
    app.use(bodyParser.urlencoded({extended: false}));

    app.get('/', (req, res) => {
        res.status(200).send('Go to /add-product');
    })

    app.get('/add-product', (req, res) => {
        res.status(200).sendFile(path.join(__dirname + '/product.html'));
    })

    app.post('/', async (req, res) => {
        let {name, quantity, price} = req.body;
        quantity *= 1;
        price *= 1;

        const product = await products.findOne({name});
        if (!product) {
            await products.insertOne({name, quantity, price});
        } else {
            await products.updateOne({name}, {$set: {quantity, price}});
        }
        res.status(200).send('Data has been added');
    })

    app.listen(3000, () => {
        console.log('The application is available on port 3000');
        console.log('Press Ctrl + C to stop');
    })
})
