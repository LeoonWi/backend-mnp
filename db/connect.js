import mariadb from '../node_modules/mariadb/callback.js';

export const db = mariadb.createConnection({
    host: '127.0.1.1',
    user: 'root',
    password: '2003',
    database: "mnp",
});

// db.connect(function(err) {
//     if(err) {
//         console.log("Ошибка подключения! Err: "); throw err;
//     } else {
//         console.log("Подключение прошло успешно!");
//     }
// });