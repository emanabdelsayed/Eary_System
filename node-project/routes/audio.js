const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadAudio");
const util = require("util"); //helper

//admin
// create Exam(question/audio)
router.post(
    "",
    admin,
    upload.single("audio_file"),
  body("question")
    .isString()
    .withMessage("please enter a valid question")
    .isLength({ min: 20 })
    .withMessage("description name should be at lease 20 characters"),
  body("priority")
    .isInt()
    .withMessage("please enter a valid priority")
    .toInt(),
    async(req,res)=>{
    try{
     //1-validation request [manual,express validation]
     const errors = validationResult(req);
     if(!errors.isEmpty()){
    
      return res.status(400).json({errors : errors.array()});
     }
        // Validate the audio file
        if (!req.file || req.file.mimetype.split('/')[0] !== 'audio') {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Audio file is required",
                    },
                ],
            });
        }

     //3- prepare question object 
     const  Q_E ={
       question: req.body.question,
       audio_file: req.file.originalname,
       priority: req.body.priority,
     };

     //4-insert question exam into db
     const query =util.promisify(conn.query).bind(conn);
     await query ("insert into questions_exam  set?", Q_E );
     res.status(200).json({
      msg:"audio create successfully !",
     });
    }catch(err){
     res.status(500).json(err);
    }
  }   
);

//  function to fetch the Question record from the database by its id.
async function getQuestionById(question_id) {
    const query = util.promisify(conn.query).bind(conn);
    const results = await query("select * from questions_exam where question_id = ?", question_id);
    return results[0];
}
  
// Update Exam(question/audio)
router.put(
    "/:question_id",
    admin,
    upload.single("audio_file"),
    body("question")
        .isString()
        .withMessage("please enter a valid question")
        .isLength({ min: 20 })
        .withMessage("description name should be at lease 20 characters"),
    async (req, res) => {
        try {
            //1-validation request [manual,express validation]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            }

            const question_id = req.params.question_id;
            const question = await getQuestionById(question_id);

            if (!question) {
                return res.status(404).json({ msg: "Question not found" });
            }

            // Update the  question fields
            question.question = req.body.question;

            // Update the audio file if provided
            if (req.file && req.file.mimetype.split('/')[0] === 'audio') {
                question.audio_file = req.file.originalname;
            }

            //3- update exam in db
            const query = util.promisify(conn.query).bind(conn);
            await query("update questions_exam set ? where question_id = ?", [question, question_id]);

            res.status(200).json({
                msg: "audio updated successfully !",
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
);

// delete Exam(question/audio)
router.delete("/:question_id",
   admin, 
   async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const question = await query(
        "SELECT * FROM questions_exam WHERE question_id = ?",
        req.params.question_id
      );
      if (!question.length) {
        return res.status(404).json({
          msg: "Question not found",
        });
      }
      await query(
        "DELETE FROM questions_exam WHERE question_id = ?",
        req.params.question_id
      );
      res.status(200).json({
        msg: "Question deleted successfully!",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//LIST ALL QUESTION [ADMIN,USER]
router.get("",
admin,
 async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";
    if (req.query.search) {
      //QUARY PARAMS
      search =
              `question LIKE'%${req.query.search}%' or
               audio_file LIKE'%${req.query.search}%'`;
    }
    const Exam = await query(`select * from questions_exam ${search}`);
    Exam.map((audio) => {
      audio.audio_file = "http://" + req.hostname + ":5000/" + audio.audio_file;
    });
    res.status(200).json(Exam);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SEARCH WITH ID [ADMIN,USER]
router.get("/:question_id", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const Exam = await query(`select * from questions_exam where question_id = ${req.params.question_id}`);
    if (Exam.length === 0) {
      return res.status(404).json({
        msg: "Exam not found",
      });
    }
    Exam[0].audio_file = "http://" + req.hostname + ":5000/" + Exam[0].audio_file;
    res.status(200).json(Exam[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router ;