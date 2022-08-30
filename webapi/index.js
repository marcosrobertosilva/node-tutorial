const express = require('express');
const app = express();
const port = 3000; //porta padrão
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PWD,
    database: process.env.MYSQL_DB_NAME
});

connection.connect();

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

app.get('/clientes/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    let query = 'SELECT * FROM Clientes' + filter;
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
        res.json(rows);
    })
});

app.delete('/clientes/:id', (req, res) =>{
    let query = 'DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id);
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
        res.json(rows);
    })
});

app.post('/clientes', (req, res) => {
    console.log(req.body);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    let query = `INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`;

    connection.query(query, (err, rows, fields) => {
        if (err) throw err
        res.json(rows);
    });
    // curl --header "Content-Type: application/json" --request POST --data '{"nome":"marcos","cpf":"00998877662233"}' http://localhost:3000/clientes
});

app.patch('/clientes', (req, res) => {
    console.log(req.body);
    const id = parseInt(req.body.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    let query = `UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`;
    connection.query(query, (err, rows, fields) => {
        if (err) throw err
        res.json(rows);
    });

    // curl --header "Content-Type: application/json" --request PATCH --data '{"id": 10, "nome":"rejane","cpf":"00998877662233"}' http://localhost:3000/clientes
});
