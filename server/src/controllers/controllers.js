const registerUser = require('../models/registerUser')

const AddUser = async (req, res) => {
    await registerUser.addUser(req.body);

}

const checkLogin = async (req, res) => {

    const result = await registerUser.checklogin(req.body);
    return res.json(result);




}

const listUser = async (req, res) => {

    const result = await registerUser.allUsers(req);
    return res.json(result.allUsers);
}

const changeRole = async (req, res) => {

    const result = await registerUser.changerole(req);
    console.log("requisicao put feita");
    console.log("id recebido: ", req.params.id);
    console.log("role recebida: ", req.body);
    return res.json(result);
}

module.exports = {
    AddUser,
    checkLogin,
    listUser,
    changeRole
}