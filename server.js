const express = require("express");
const mockData = require("./db.json");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/all', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'retrieved all testing data successfully',
        data: mockData
    })
});


app.post('/api/token', (req, res) => {

    if ((req).query.client_secret != 123456) {
        res.status(401).send({ error: "Unauthorized" })
    } else {
        res.status(200).send({
            access_token: mockData.token.access_token,
            token_type: mockData.token.token_type,
            expires_in: mockData.token.expires_in,
            scope: mockData.token.scope
        })
    }
});

const PORT = 5000;

console.log(mockData.access_token);


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});