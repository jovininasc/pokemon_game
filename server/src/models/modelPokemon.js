const connection = require('./connection');
const jwt = require('jsonwebtoken');



const postpokedex = async (req) => {
    const { user_id, name, tipo, level, profile_link } = req.body;

    const query = 'INSERT INTO pokedex_user (user_id, name, tipo, level, profile_link) VALUES (?, ?, ?, ?, ?)';

    const posted = await connection.execute(query, [user_id, name, tipo, level, profile_link]);
    console.log("indo para a pokedex:", posted);
    return { success: true, posted };
}
const pokemonsView = async () => {
    const query = 'SELECT id, name, tipo, captura, profile_link FROM registerpokemon';

    const [pokemons] = await connection.execute(query);
    const random = Math.floor(Math.random() * pokemons.length);
    const viewPoke = [pokemons[random]];


    if (pokemons.length > 0) {
        return { success: true, viewPoke };
    }
    else {
        return { success: false, message: "não existem pokemons cadastrados." };
    }
}
const listpokemon = async (req) => {
    const userId = req.params.id;

    const query = 'SELECT id, name, tipo, level, profile_link FROM pokedex_user WHERE user_id = ?';
    const [lista] = await connection.execute(query, [userId]);

    if (lista.length > 0) {
        return { success: true, lista };
    }
    else {
        return { success: false, message: "lista não retornada" };
    }
}

const registerpoke = async (req) => {

    const { name, tipo, porcentagem, link } = req;

    const query = 'INSERT INTO registerpokemon (name, tipo, captura, profile_link) VALUES (?,?,?,?)';
    const registrado = await connection.execute(query, [name, tipo, porcentagem, link]);
    console.log(registrado);
    if (registrado.length > 0) {
        return { success: true, registrado };
    }
    else {
        return { success: false, message: "pokemon não registrado" };
    }

}

const fortalecer = async (req) => {
    const { level } = req.body;
    console.log("Models level:", level)
    const id = req.params.id;

    const query = 'UPDATE pokedex_user SET level = ? WHERE id = ?';

    const fortalecidoDB = await connection.execute(query, [level, id]);

    if (fortalecidoDB.length > 0) {
        return { success: true, fortalecidoDB };
    }
    else {
        return { success: false, message: "Models: não upou o pokemon" };
    }
}

const soltar = async (req) => {
    const id = req.params.id;

    const query = 'DELETE FROM pokedex_user WHERE id = ?';

    const [solto] = await connection.execute(query, [id]);

    if (solto.affectedRows > 0) {
        return { success: true, solto };
    } else {
        return { sucess: false, message: "não foi possivel soltar o pokemon" };
    }
}


module.exports = {
    listpokemon,
    registerpoke,
    fortalecer,
    soltar,
    pokemonsView,
    postpokedex
}