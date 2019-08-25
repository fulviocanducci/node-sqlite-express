const sqlite3 = require('sqlite3').verbose();

module.exports = {
    open: () => {
        return new sqlite3.Database('./db/base.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) console.log(err);
            console.log('Connection success');
        });
    }
}