const express = require('express');
const cors = require('cors');
const router = require('./router');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

require('dotenv').config();

const port = process.env.dotnev || 3030;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;

