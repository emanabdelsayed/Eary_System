const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadAudio");
const util = require("util"); //helper

//user
router.get("", async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn);
        let search = "";
        let status = 1; // Default status is 1
        if (req.query.search) {
            search =
                `question LIKE'%${req.query.search}%' or
                audio_file LIKE'%${req.query.search}%'`;
        }
        if (req.query.status !== undefined) {
            status = req.query.status; // Update status if it's provided
        }
        const Exam = await query(`
            SELECT 
                q.question, 
                q.audio_file, 
                GROUP_CONCAT(a.answer SEPARATOR '|') as answers
            FROM questions_exam q 
            INNER JOIN answers_question a 
            ON q.question_id = a.question_id 
            WHERE q.status = ?
            ${search && `AND (${search})`} 
            GROUP BY q.question, q.audio_file
            ORDER BY q.priority ASC 
        `, [status]);
        Exam.map((audio) => {
            audio.audio_file = "http://" + req.hostname + ":5000/" + audio.audio_file;
            audio.answers = audio.answers.split("|");
        });
        res.status(200).json(Exam);
    } catch (err) {
        res.status(500).json(err);
    }
});

//admin
router.get("/admin",
  admin, async (req, res) => {
    try {
        const query = util.promisify(conn.query).bind(conn);
        let search = "";
        let status = 1; // Default status is 1
        if (req.query.search) {
            search =
                `question LIKE'%${req.query.search}%' or
                audio_file LIKE'%${req.query.search}%'`;
        }
        if (req.query.status !== undefined) {
            status = req.query.status; // Update status if it's provided
        }
        const Exam = await query(`
            SELECT 
                q.question_id,
                q.status,
                q.priority,
                q.question, 
                q.audio_file, 
                GROUP_CONCAT(a.answer SEPARATOR '|') as answers
            FROM questions_exam q 
            INNER JOIN answers_question a 
            ON q.question_id = a.question_id 
            WHERE q.status = ?
            ${search && `AND (${search})`} 
            GROUP BY q.question, q.audio_file
            ORDER BY q.priority ASC 
        `, [status]);
        Exam.map((audio) => {
            audio.audio_file = "http://" + req.hostname + ":5000/" + audio.audio_file;
            audio.answers = audio.answers.split("|");
        });
        res.status(200).json(Exam);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
  