const modelPokemon = require('../models/modelPokemon');

const listPokemons = async (req, res) => {
    const listPoke = await modelPokemon.listpokemon(req);
    console.log("lista dos pokemons id:", req.params.id);
    return res.json(listPoke.lista);
}

const registerPoke = async (req, res) => {
    console.log("está chegando as models");
    const pokeRegistrado = await modelPokemon.registerpoke(req.body);
    console.log(req.body);
    console.log("Pokemon registrado: ", pokeRegistrado.registrado);

    return res.json(pokeRegistrado);
}

const Fortalecer = async (req, res) => {
    console.log("Models level:", req.body);
    const fortalecido = await modelPokemon.fortalecer(req);
    console.log("Models level:", req.body);
    return res.json(fortalecido.fortalecidoDB);
}

const soltar = async (req, res) => {

    const pokemonSolto = await modelPokemon.soltar(req);

    return res.json(pokemonSolto.solto);
}


const capPoke = async (req, res) => {
    const listPoke = await modelPokemon.pokemonsView(req);

    return res.json(listPoke.viewPoke);
}

const postPokedex = async (req, res) => {

    console.log("vai para a pokedex:", req.body);
    const finish = await modelPokemon.postpokedex(req);

    return res.json(finish.posted);
}
module.exports = {

    listPokemons,
    registerPoke,
    Fortalecer,
    soltar,
    capPoke,
    postPokedex
}