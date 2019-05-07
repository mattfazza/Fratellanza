var request = require("request");
const bodyParser = require('body-parser');


var token;
//EN: in order to get access to the endpoints from the iFood api, you need to obtain a token first
//PT: pra poder acessar os endpoints da API, é preciso obter um token primeiro
//EN: the url below is the real URL, for purposes of testing, I'm using the mock API url
//PT: o endereço abaixo é o endereço real, só que pra testar, eu estou usando a API de mentira
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


//EN: the first line inside is only necessary when testing with the mock server since we use bodyParse there
//PT: a primeira linha dentro da função só é necessária quando se está testando com o servidor falso, já que usamos bodyParse por lá
getToken().then(function (result) {

    res = JSON.parse(result);

    if (res.scope == "trust read write") {
        token = res.access_token;
        console.log("Successfully acquired token.")
    }

}, function (err) {
    console.log("Error getting token");
    console.log(err);
})

