const conn = require("../../config/dbConn");
const {generateAccessToken} = require("../../middleware/jwtToken")
const bcrypt = require("bcrypt");
const localStorage = require('local-storage');

const login = async (req, res) => {
	const {username,password} = req.body;
	try {
	  await conn.connect(async (err) => {
		let sql = `SELECT * FROM login WHERE email='${username}'`
		await conn.query(sql, async (err,result) =>{
			// console.log(sql);
		  if (err) throw err;
		  if(result == '' || result.length == 0){
			let msg = "Invalid User";
			return res.render("../views/index", { errMsg: msg } )
		  }else{
			let pwd;
			result.map(value => {
			  pwd = value.password;
		  })
		//   console.log(pwd);
			let validPassword = await bcrypt.compare(password,pwd);
			if(!validPassword){
				let msg = "Invalid Password";
				return res.render("../views/index", { errMsg: msg })
			}else{
				const token = generateAccessToken({ username: username })
				// console.log(token);
				// console.log(process.env.oneDay);
				if(token){
						localStorage.set('user', JSON.stringify(token))
					res.cookie("token", token).redirect("/dashboard" )
				}
			}
		  }
		})
	  })
	} catch (error) {
	  console.log(error);
	}
  };

module.exports = login