const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const URL_API = 'https://rickandmortyapi.com/api/character';

app.use(express.static(path.join(__dirname)));

function buscarPersonages(callback) {
    http.get(URL_API, (resposta) => {
        let dados = '';
        resposta.on('data', parte => { dados += parte; });
        resposta.on('end', () => {
            const json = JSON.parse(dados);
            callback(json.results);
        });
    });
}

app.get('/personagens', (req, res) => {
    buscarPersonages(personagens => {
        res.json(personagens);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

