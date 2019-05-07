
var request = require("request");

//EN: the url below is the real URL, for purposes of testing, I'm using the mock API url
//PT: o endereço abaixo é o endereço real, só que pra testar, eu estou usando a API de mentira
var options = {
    method: 'POST',
    //url: 'https://pos-api.ifood.com.br/oauth/token',
    url: 'http://localhost:3000/token',
    qs:
    {
        client_id: '####',
        client_secret: '####',
        grant_type: '####'
    }
};

//EN: in order to get access to the endpoints from the iFood api, you need to obtain a token first
//PT: pra poder acessar os endpoints da API, é preciso obter um token primeiro
function getToken(opt) {
    request(opt, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

}


getToken(options)



