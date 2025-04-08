const connection = require('./connection');
const jwt = require('jsonwebtoken');

//função que gera um token
function validInfo(usuario) {
    const payload = {
        email: usuario.email,
        password: usuario.password
    };
    const secret = 'pokemon';
    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options);
}

//registra um usuario no Banco de dados
const addUser = async (user) => {
    const { name, email, password } = user;
    const role = 'hunter';

    const queryEmail = 'SELECT email FROM register WHERE email = ?';
    const [verifEmail] = await connection.execute(queryEmail, [email]);

    if (verifEmail.length > 0) {
        return { success: false, message: "email já cadastrado." }
    }
    const query = 'INSERT INTO register (name, email, password, role) VALUES(?, ?, ?, ?)';
    const [AddUser] = await connection.execute(query, [name, email, password, role]);

    return { success: true, insert: AddUser.insert };

}

//verifica o login do usuario e gera um token
const checklogin = async (user) => {

    const { email, password } = user;

    const query = 'SELECT id, email, password, role, name FROM register WHERE email = ? AND password = ?';
    const [checked] = await connection.execute(query, [email, password]);


    if (checked.length > 0) {

        const token = validInfo(checked[0]);
        const role = checked[0].role;
        const id = checked[0].id;
        const name = checked[0].name;
        return { success: true, token, role, id, name };
    } else {

        return { success: false, message: "Credenciais inválidas" };
    }
}

//puxa uma lista com todos os usuarios
const allUsers = async () => {


    const query = 'SELECT name, role, id, email FROM register';
    const [allUsers] = await connection.execute(query);

    if (allUsers.length > 0) {
        return { success: true, allUsers };
    } else {

        return { success: false, message: "Credenciais inválidas" };
    }
}

const changerole = async (req, res) => {
    const id = req.params.id;
    const { role } = req.body;

    const query = 'UPDATE register SET role = ? WHERE id = ? ';
    const update = await connection.execute(query, [role, id]);
    console.log("dados trocados");
    if (update.length > 0) {
        return { success: true, update };
    } else {
        return { success: false, message: "não foi possivel atualizar o usuario" };
    }
}
module.exports = {
    addUser,
    checklogin,
    allUsers,
    changerole
}