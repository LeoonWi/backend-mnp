import { db } from "./connect.js";

export const showListMarker = async (req, res) => {
    await db.query(
        `SELECT Meeting.id, Meeting.latitude, Meeting.longitude
        FROM Meeting, User, Participant
        WHERE User.id = ? AND Participant.user_id = User.id AND Participant.meeting_id = Meeting.id`,
        [req.body.idUser], (err, res_db) => {
            if(err) {
                console.log(err);
                res.statusCode(400);
            } else {
                res.json(res_db);
            }
        }
    );
}

export const showMeeting = async (req, res) => {
    await db.query(
        `SELECT Meeting.id, Meeting.name, Meeting.latitude, Meeting.longitude, Meeting.date
        FROM Meeting, User, Participant
        WHERE User.id = ? AND Participant.user_id = User.id AND Participant.meeting_id = Meeting.id`,
        [req.body.idUser], (err, res_db) => {
            if(err) {
                console.log(err);
                res.statusCode(400);
            } else {
                res.json(res_db);
            }
        }
    );
}

export const createMeeting = async (req, res) => {
    await db.query(
        `INSERT INTO Meeting (Meeting.name, Meeting.latitude, Meeting.longitude, Meeting.date, Meeting.owner_id)
        VALUE (?,?,?,?,?)`, [req.body.name, req.body.lat, req.body.lon, req.body.date, req.body.user_id], async (err, res_db) => {
            if(err) {
                console.log(err);
                res.statusCode(400);
            } else {
                await db.query(`SELECT Meeting.id FROM Meeting WHERE Meeting.name = ? AND Meeting.date = ? AND Meeting.owner_id = ?`,
                [req.body.name, req.body.date, req.body.user_id], async (err, res_db_show) => {
                    if(err) {
                        console.log(err);
                        res.statusCode(400);
                    } else {
                        await db.query(`INSERT INTO Participant (Participant.user_id, Participant.meeting_id, Participant.accepted)
                        VALUE (?,?,1)`, [req.body.user_id, res_db_show[0]["id"]], (err, data) => {
                            if(err) {
                                console.log(err);
                                res.statusCode(400);
                            } else {
                                res.json({"message":"Successfully"});
                            }
                        })
                    }
                });
            }
        }
    );
}