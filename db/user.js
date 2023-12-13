import {db} from './connect.js';

export const login = async (req, res) => {
    await db.query(
        'SELECT User.id FROM mnp.User WHERE User.email = ? AND User.password = ?',
        [req.body.email, req.body.password], (err, res_db) => {
            if(err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                if(res_db[0] != undefined) {
                    res.json(res_db[0]);
                } else {
                    res.sendStatus(400);
                }
            }
        });
};

export const reg = async (req, response) => {
    await db.query(
        "SELECT User.name FROM User WHERE User.name = ?",
        [req.body.name], async (err,res) => {
            if(err) {
                console.log(err);
                response.sendStatus(400);
            } else {
                if(res[0] != undefined) {
                    response.json({"message":"Name_taken"})
                } else {
                    await db.query(
                        "INSERT INTO User (User.name, User.email, User.password) VALUE (?,?,?)",
                        [req.body.name, req.body.email, req.body.password], (err,res_db) => {
                            if(err) {
                                console.log(err);
                                response.sendStatus(400);
                            } else {
                                response.json({"message":"Successfully"});
                            }
                        }
                    );
                }
            }
        }
    );
}

export const showUser = async (req, res) => {
    await db.query(
        'SELECT * FROM mnp.User WHERE User.id = ?',
        [req.body.id], (err, res_db) => {
            if(err) {
                console.log(err);
                res.status(400);
            } else {
                res.json(res_db[0]);
            }
        }
    );   
};