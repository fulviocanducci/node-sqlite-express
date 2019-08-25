const connection = require('./connection');
//https://github.com/mapbox/node-sqlite3/wiki/API
module.exports = {
    all() {
        return new Promise((resolve, reject) => {
            const db = connection.open();
            db.all('SELECT * FROM todos', (err, rows) => {
                if (err) { 
                    reject(err);
                } else {
                    resolve(rows);
                }
                db.close();
            });
        });        
    },
    find(id) {
        return new Promise((resolve, reject) => {
            const db = connection.open();
            db.get('SELECT * FROM todos WHERE id=?',id, (err, row) => {
                if (err) { 
                    reject(err);
                } else {
                    resolve(row);
                }
                db.close();
            });
        });        
    },
    add(params) {
        return new Promise((resolve, reject) => {
            const db = connection.open();
            db.run('INSERT INTO todos(description, done) VALUES (?,?)',params,(err) => {
                if (err) { 
                    reject(err);
                } else {                    
                    resolve(['Inserted'/*, this.changes, this.lastID*/]);
                }
                db.close();
            });
        });
    },
    edit(params) {
        return new Promise((resolve, reject) => {
            const db = connection.open();
            db.run('UPDATE todos SET description=?, done=? WHERE id=?',params, (err) => {
                if (err) { 
                    reject(err);
                } else {                    
                    resolve(['Updated']);
                }
                db.close();
            });
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            const db = connection.open();
            db.run('DELETE FROM todos WHERE id=?',id, (err) => {
                if (err) { 
                    reject(err);
                } else {                    
                    resolve(['Deleted']);
                }
                db.close();
            });
        });
    }
}
