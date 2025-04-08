const app = require('./index');

require('dotenv').config();

const port = process.env.dotnev || 3030;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});