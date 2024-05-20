require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require('./db/database-connection');
const cors = require('cors');
require('express-async-errors');

const personagemRouter = require('./personagem/personagem.router');

async function main() {
    await connectToDatabase()

    const app = express()
    app.use(express.json())
    app.use(cors())

    app.get('/', function (req, res) {
        res.send('Hello World!')
    })

    app.use('/personagem', personagemRouter)

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send({ error: 'Algo deu errado!' })
    })

    app.listen(3000, function () {
        console.log('Servidor rodando em http://localhost:3000')
    })
}

main();