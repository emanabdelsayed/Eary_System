
  const router = require("express").Router();
  const conn = require("../db/dbConnection");
  const authorized = require("../middleware/authorize");
  const admin = require("../middleware/admin");
  const { body, validationResult } = require("express-validator");
  const upload = require("../middleware/uploadAudio");
  const util = require("util"); //helper
  

// create Answer
router.post(
    "/answer/:question_id",
    admin,
    body("answer")
      .isString()
      .withMessage("Please enter a valid answer")
      .isLength({ min: 1 })
      .withMessage("Answer should be at least 1 character long"),
      body("correct_answer")
      .isBoolean()
      .withMessage("Please enter a valid boolean for correct_answer"),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const answer = {
          question_id: req.params.question_id,
          answer: req.body.answer,
          correct_answer: req.body.correct_answer
        };
  
        const query = util.promisify(conn.query).bind(conn);
        await query("insert into answers_question set ?", answer);
  
        res.status(200).json({
          msg: "Answer created successfully!",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
  
// read all answers
router.get("/answer/:question_id", async (req, res) => {
    try {
        const question_id = req.params.question_id;
        const query = util.promisify(conn.query).bind(conn);
        const answers = await query(
            "select answer, correct_answer from answers_question where question_id = ?",
            question_id
        );

        res.status(200).json({
            answers,
        });
    } catch (err) {
        res.status(500).json(err);
    }
}); 

// update Answer
router.put(
    "/answer/:question_id/:id",
    admin,
    body("answer")
      .isString()
      .withMessage("Please enter a valid answer")
      .isLength({ min: 0 })
      .withMessage("Answer should be at least 0 character long"),
      body("correct_answer")
      .isBoolean()
      .withMessage("Please enter a valid boolean for correct_answer"),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const answer = {
          answer: req.body.answer,
          correct_answer: req.body.correct_answer,
        };
  
        const query = util.promisify(conn.query).bind(conn);
        await query("update answers_question set ? where id = ?", [
          answer,
          req.params.id,
        ]);
  
        res.status(200).json({
          msg: "Answer updated successfully!",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
  
// delete Answer
router.delete(
    "/answer/:question_id/:id",
    admin,
    async (req, res) => {
        try {
            const query = util.promisify(conn.query).bind(conn);
            await query("delete from answers_question where id = ?", [
                req.params.id,
            ]);

            res.status(200).json({
                msg: "Answer deleted successfully!",
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
);



module.exports = router;
