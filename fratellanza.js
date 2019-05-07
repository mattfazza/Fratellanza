var request = require("request");
const bodyParser = require('body-parser');

var token;
var ids = [];
var dateObj = new Date()
today = dateObj.toISOString().slice(0, 10);


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
        url: 'http://localhost:5000/api/events:CONCLUDED',
        bearer: token
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

function getMoney(ref) {

    var options = {
        method: 'GET',
        //url: 'https://pos-api.ifood.com.br/v1.0/orders/' + ref'
        url: 'http://localhost:5000/api/orders/' + ref,
        bearer: token
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




getOrderIds().then(function (result) {

    let res = JSON.parse(result);
    //res = result;

    for (var i = 0; i < res.length; i++) {
        if (res[i].createdAt.startsWith(today)) {
            ids.push(res[i].id);
        } else {
            //EN: we can break here because the data comes in sequential form
            //PT: não há problema em sair do loop aqui porque os dados vêm de forma sequencial
            break;
        }
    }

    //console.log(ids);

}, function (err) {
    console.log("failed to retrieve orders");
    console.log(err);
});


var totalSales = 0;
function collection() {
    for (var j = 0; j < ids.length; j++) {
        getMoney(ids[j]).then(function (result) {

            let res = JSON.parse(result);
            //res = result;

            totalSales += res.totalPrice;
            //console.log(totalSales);

        }, function (err) {
            console.log("failed to retrieve orders");
            console.log(err);
        });
    }
}

setTimeout(() => collection(), 3000);
setTimeout(() => { console.log("Total number of sales on " + today + ": " + totalSales) }, 60000);
setTimeout(() => { console.log("Quantidade total de vendas hoje " + today + ": " + totalSales) }, 60000);

//Heroku sends the output as an email