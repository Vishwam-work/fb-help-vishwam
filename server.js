const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json()); // Allows us to parse JSON 

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"fb_helpdesk"

})

app.post('/register',(req,res)=>{
    const sql = "INSERT INTO register_data (`Name`,`email`,`password`) VALUES (?,?,?)";
    const data = [req.body.name, req.body.email, req.body.password];
    console.log(data)
    database.query(sql,data,(err,result)=>{
        if(!err){
            return res.json(data)

        }
        else{
            console.log(err);
            return res.send("Failed to insert the data.");
        }
    })
    
})
app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM register_data WHERE `email` = ? AND  `password`= ? " ;
    database.query(sql,[req.body.email,req.body.password],(err,result)=>{
        console.log("data-",[req.body.email,req.body.password])
        console.log(result)
        if(err){
            console.log(err);
            return res.json("Error")
        }
        if(result.length > 0){
            console.log(result.length)
            return res.json("Success")
        }
        else{
            return res.json("Failed")
        }
    })
    
})


// Chat api
app.post('/send-message', (req, res) => {
    const { profileName, message } = req.body;
    console.log({ profileName, message })
    const sql = 'INSERT INTO chats (Name, chats) VALUES (?, ?)';
    database.query(sql, [profileName, message], (err, result) => {
      if (err) {
        console.error('Error inserting message into database:', err);
        res.status(500).json({ error: 'Failed to send message' });
      } else {
        console.log('Message inserted into database');
        res.json({ success: true });
      }
    });
  });

app.listen(8080,()=>{
    console.log("Listening")
})

