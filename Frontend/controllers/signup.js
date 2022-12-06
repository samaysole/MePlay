const db =require("../routes/db-config");
const bcrypt = require ("bcryptjs");

const signup = async (req, res) => {
    const { username, password: Npassword, firstN, lastN } = req.body;
    if (!username || !password || !firstN || !lastN) return res.json({status: "error", error: "Please provide an entry to the fields"});
    else{
        db.query('SELECT * FROM user_info WHERE username = ?', [username], async (err, results) => {
            if(err) throw err;
            if (result[0]) return res.json({status: "error", error: "Please provide an entry to the fields"})
            else{
                const password = bcrypt.hash(Npassword, 8);
                db.query('INSERT INTO user_info SET ?', { username: username, userPass: hashedPassword, f_name: firstN, l_name:lastN }, (err, results) => {
                    if(error) throw error;
                    return res.json({status: "success", success: "User has been registered"})
               })
            }
        })
    }
}
module.exports=signup;