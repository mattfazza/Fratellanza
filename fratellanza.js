var request = require("request");
const bodyParser = require('body-parser');

var token;

//EN: the urls below are the real URL, for purposes of testing, I'm using the mock API url
//PT: os endereços abaixo são os endereços reais, só que pra testar, eu estou usando a API de mentira


//EN: in order to get access to the endpoints from the iFood api, you need to obtain a token first
//PT: pra poder acessar os endpoints da API, é preciso obter um token primeiro
function getToken() {

    var options = {
        method: 'POST',
        //url: 'https://pos-api.ifood.com.br/oauth/token',
        url: 'http://localhost:5000/api/token',
        qs:
        {
            client_id: '####',
            client_secret: '123456',
            grant_type: '####'
        }
    };

    return new Promise(function (resolve, reject) {

        request.post(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

function getOrderIds() {

    var options = {
        method: 'GET',
        //url: 'https://pos-api.ifood.com.br/v1.0/events%3ACONCLUDED'
        url: 'http://localhost:5000/api/events:CONCLUDED'
    };

    return new Promise(function (resolve, reject) {

        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })

}

//EN: the first line inside is only necessary when testing with the mock server since we use bodyParse there
//PT: a primeira linha dentro da função só é necessária quando se está testando com o servidor falso, já que usamos bodyParse por lá
getToken().then(function (result) {

    res = JSON.parse(result);
    //res = result;

    if (res.scope == "trust read write") {
        token = res.access_token;

        console.log("Successfully acquired token.")
    }


}, function (err) {
    console.log("Error getting token");
    console.log(err);
});



var ids = [];
getOrderIds().then(function (result) {

    let res = JSON.parse(result);
    //res = result;

    for (var i = 0; i < res.length; i++) {
        ids.push(res[i].id)
    }

}, function (err) {
    console.log("failed to retrieve orders");
    console.log(err);
});
