const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PWD,
    database: process.env.MYSQL_DB_NAME
});


connection.connect((err) => {
    if (err) return console.log(err);
    console.log('conectou!');
    createTable(connection);
})

function createTable(conn) {
    const sql = `CREATE TABLE IF NOT EXISTS Clientes(
                 ID int NOT NULL AUTO_INCREMENT,
                 Nome varchar(150) NOT NULL,
                 CPF char(11) NOT NULL,
                 PRIMARY KEY (ID)
                 );`;

    conn.query(sql, (error, results, fields) => {
        if (error) return console.log(error);
        console.log('criou a tabela!');
        const sql = "INSERT INTO Clientes(Nome,CPF) VALUES ?";
        const values = [
            ['teste1', '12345678901'],
            ['teste1', '09876543210'],
            ['teste3', '12312312399']
        ];
        conn.query(sql, [values], (error, results, fields) => {
            if (error) return console.log(error);
            console.log('adicionou registros!');
            conn.end();//fecha a conexão
        });
    });

}
