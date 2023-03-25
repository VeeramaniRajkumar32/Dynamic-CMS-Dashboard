const bcrypt = require("bcrypt");
const conn = require("../../config/dbConn");
const {generateAccessToken} = require("../../middleware/jwtToken")
const localStorage = require('local-storage');

const register = async (req, res) => {
  const { name,userName,password,confirmPassword } = req.body;
  await conn.connect(async (err) => {
	  let sql = `SELECT * FROM login WHERE email='${userName}'`
	  await conn.query(sql, async (err,result) =>{
		// console.log(sql);
		  if (err) throw err;
		  if(result != ''){
			let msg = "User Already Exist. Please Login";
			return res.render("../views/register.ejs", { errMsg: msg } )
		  }else{
			if(password === confirmPassword){
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);
				const token = generateAccessToken({ username: userName });
				const insert = `INSERT INTO login (name,password,email,role) VALUES ('${name}','${hashedPassword}','${userName}', 'admin')`
				if(await conn.query(insert)){
					localStorage.set('user', JSON.stringify(token))
					res.cookie("token", token).redirect('/dashboard')
				}
			}else{
				let msg = "Miss Matched Password";
				return res.render("../views/register.ejs", { errMsg: msg } )
			}
		  }
	  })
	})
};

module.exports = register;