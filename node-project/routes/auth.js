const router = require("express").Router();
const conn = require("../db/dbConnection");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); //helper
const bcrypt = require("bcrypt");
const crypto = require("crypto");


// REGISTRATION
router.post(
  "/register",
  body("email").isEmail().withMessage("please enter a valid email"),
  body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 10, max: 20 })
    .withMessage("name should be between (10-20) character"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  async (req, res) => {
    try {
      //1- validation request manual, express validation!
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //2- check if email is existed
      //await/async
      const query = util.promisify(conn.query).bind(conn);
      const checkEmailExists = await query("select * from users where email =?", [
        req.body.email,
      ]);
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email already exists !",
            },
          ],
        });
      } else {
        //3- PREPARE OBJECT USER TO -> SAVE
        const userData = {
          name: req.body.name,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          token: crypto.randomBytes(16).toString("hex"), //JSON WEB TOKEN, CRYPTO -> RANDOM ENCRYPTION STANDARD
        };

        //4- insert user object into db
        await query("insert into users set? ", userData);

        //5- Check if user is active
        const user = await query(
          "select * from users where email = ?",
          [req.body.email]
        );
        if (user[0].status === 0) {
          res.status(403).json({
            errors: [
              {
                msg: "Your account is not yet approved by the admin!",
              },
            ],
          });
        } else {
          delete userData.password;
          res.status(200).json(userData);
        }
      }
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
);

// LOGIN
router.post(
  "/login",
  body("email").isEmail().withMessage("please enter a valid email!"),
  body("password").isLength({ min: 8, max: 12 }).withMessage("password should be between (8-12) character"),
  async (req, res) => {
    try {
      //1- VALIDATION REQUEST [manual, express validator]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //2- check if email is existed
      const query = util.promisify(conn.query).bind(conn);//transform query mysql --> promise to use [await/async]
      const user = await query(
        "select * from users where email = ?",
        [req.body.email,
        ]);
      if (user.length == 0) {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found !",
            },
          ],
        });
      } else if (user[0].status == 0) { // Check if user is inactive
        res.status(403).json({
          errors: [
            {
              msg: "Your account is not yet approved by the admin!",
            },
          ],
        });
      } else {
        //3- COMPARE HASHED PASSWORD
        const checkPassword = await bcrypt.compare(
          req.body.password,
          user[0].password
        );
        if (checkPassword) {
          delete user[0].password;
          res.status(200).json(user[0]);
        } else {
          res.status(404).json({
            errors: [
              {
                msg: "email or password not found !",
              },
            ],
          });
        }
      }
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }
);

// UPDATE PROFILE
router.put("/update",
 async (req, res) => {
  try {
    // Get the current user ID from the request object
    const userToken = req.headers.token;
        
    // Update the user profile in the database
    const query = util.promisify(conn.query).bind(conn);
    const updatedAdmin = await query(
      "UPDATE users SET name = ?, email = ?, phone = ? WHERE token = ?",
      [req.body.name, req.body.email, req.body.phone, userToken]
    );

    // Check if the profile was updated successfully
    if (updatedAdmin.affectedRows === 0) {
      return res.status(404).json({ message: "Admin profile not found" });
    } else {
      return res.status(200).json({ message: " profile updated" });

    }
    
  } catch (err) {
    res.status(500).json({ error: err });
  }
});




module.exports = router;