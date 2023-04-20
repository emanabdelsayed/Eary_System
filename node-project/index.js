// ================ INITIALIZE EXPRESS ==================
const express = require("express");
const app = express();

// ============ GLOPAL MIDDLEWARE ==================
app.use(express.json());
app.use(express.urlencoded()); // To ACCESS URL FROM ENCODED
app.use(express.static("upload")); // THIS IS COTAIN  AUDIO DATAهيأكسس السيرفير
const cors =  require("cors");// بيخلي الفرونت ينترأكت مع الباك
app.use(cors());//ALLOW HTTP REQUEST LOCAL HOSTS


// ==========   REQUIRED MODULE ============
const auth = require("./routes/auth");
const audio = require("./routes/audio");
const answer = require("./routes/answer");
const adminControllerAccounts = require("./routes/adminControllerAccounts");
const ShowExam = require("./routes/ShowExam");

// ========== RUN THE APP ====================
app.listen(5000, "localhost" , () =>{
    console.log("SERVER IS RUNNING");
});

// ============ API ROUTES [endpoints] ===============
app.use("/auth", auth);
app.use("/audio", audio);
app.use("/answer", answer);
app.use("/adminControllerAccounts",adminControllerAccounts);
app.use("/ShowExam", ShowExam);
