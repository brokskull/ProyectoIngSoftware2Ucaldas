/**
 * Created by jimmyloaiza on 24/05/17.
 */

class Connection {
    constructor () {
        this.host = 'localhost';
        this.user = 'root';
        this.password = 'loaiza1144';
        this.database = 'BUSES';
        this.port = 3306;
    }

    get connection () {
        let mysql = require('mysql');
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port
        });
    }

    connect () {
        this.connection.connect(function (error) {
            if (error) {
                throw error;
            } else {
                console.log('Connect Successfully');
            }
        });
    }
}

module.exports = Connection;
