const express = require("express");
const mockToken = require("./data/token.json");
const mockEvents = require("./data/eventspolling.json")
const mockOrders = require("./data/ordersdetail.json")
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/all', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'retrieved all testing data successfully',
        data: mockToken
    })
});


app.post('/api/token', (req, res) => {

    if ((req).query.client_secret != 123456) {
        res.status(401).send({ error: "Unauthorized" })
    } else {
        res.status(200).send(
            mockToken
        )
    }
});

app.get('/api/events:polling', (req, res) => {

    res.status(200).send(
        mockEvents
    );
});

app.get('/api/orders/:reference', (req, res) => {

    let orderRef = req.params.reference;

    res.status(200).send({
        id: req.params.reference,
        totalPrice: mockOrders[req.params.reference].totalPrice
    }
    );
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

