const router = require("express").Router();
const conn = require("../db/dbConnection");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); //helper
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// ADMIN CREATE USER
router.post(
  "/admin_create_user",
  admin,
  body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 10, max: 20 })
    .withMessage("name should be between (10-20) character"),
    body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  body("email").isEmail().withMessage("please enter a valid email"),
  async(req, res) => {
    try {
      //1- validation request manual, express validation!
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //2- check if email is existed
      //await/async
      const query = util.promisify(conn.query).bind(conn);
      const checkEmailExists = await query(
        "select * from users where email =?",
        [req.body.email]
    );
    if (checkEmailExists.length >0){
        res.status(400).json({
            errord: [
                {
                    msg: "email already exists !",
                },
            ],
        });
    }
    
    //3- PREPARE OBJECT USER TO -> SAVE
        const userData = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        token: crypto.randomBytes(16).toString("hex"), //JSON WEB TOKEN, CRYPTO -> RANDOM ENCRYPTION STANDARD
      };

       //4- insert user object into db
            await query("insert into users set? ", userData);
            delete userData.password;
            res.status(200).json(userData);
            }
            catch(err){
                console.log(err); 
             res.status(500).json({err:err});
           }
});

// ADMIN DELETE USER
router.delete("/admin_delete_user/:id", 
    admin, 
     async (req, res) => {
    try {
      //1- check if the user exists
      const userId = req.params.id;
      const query = util.promisify(conn.query).bind(conn);
      const checkUserExists = await query("select * from users where id =?", [
        userId,
      ]);
      if (checkUserExists.length == 0) {
        return res.status(404).json({
          error: {
            msg: "User not found!",
          },
        });
      }
  
      //2- delete user from the database
      await query("delete from users where id = ?", [userId]);
      res.status(200).json({
        success: {
          msg: "User has been deleted successfully!",
        },
      });
    } catch (err) {
      res.status(500).json({
        error: {
          msg: "Internal Server Error!",
        },
      });
    }
});
  
// UPDATE USER STATUS
router.put("/change_status",
admin,
 async (req, res) => {
  try {
  const { id, status } = req.body; // get id and status from request body
  //1- check if the user exists
const query = util.promisify(conn.query).bind(conn);
const user = await query("SELECT * FROM users WHERE id = ?", [id]);
if (user.length == 0) {
  return res.status(404).json({
    errors: [
      {
        msg: "User not found!",
      },
    ],
  });
}

//2- update user status
await query("UPDATE users SET status = ? WHERE id = ?", [status, id]);

//3- get updated user data
const updatedUser = await query("SELECT * FROM users WHERE id = ?", [
  id,
]);

//4- send response
//res.status(200).json(updatedUser[0]);
res.status(200).json({ message: "Status is changed" });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
  }
});

// GET ALL USERS
router.get("/users",
admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const users = await query(
      "select id, name, email, phone, status from users"
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});


module.exports = router;