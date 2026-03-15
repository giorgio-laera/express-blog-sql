const mysql = require("mysql2");

const dbConfiguration = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'P@peronzolo88',
    database: 'blog'
}
function onDtabaseConnection(error){
    if(error) throw error ;

    console.log("Connessione a MySql avenuta con successo");

}

const dbConnection = mysql.createConnection(dbConfiguration);
dbConnection.connect(onDtabaseConnection);

module.exports = dbConnection;

