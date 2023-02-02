const conn = require("../../config/dbConn");

const slider = async (req, res) => {
  let image = req.files;
// var response;
  //   response += "Files uploaded successfully.<br>"
  //   for(var i=0;i<image.length;i++){
  //     console.log(image);
  //       response += `<img src="/uploads/slider/${image[i].filename}" /><br>`
  //   }
	
  //   return res.send(response)
  try {
	await conn.connect(async (err) => {
	  if (req.files) {
		for(var i=0;i<image.length;i++){
			const insert = `INSERT INTO slider (image) VALUES ('${image[i].filename}')`
			// await conn.query(insert)
			await conn.query(insert, (err) => {
				if (err) throw err;
			});
			// console.log(insert);
		}
		// const sql = `SELECT * FROM about`;
		// await conn.query(sql, async (err, result) => {
			res.render("../views/pages/slider", {
				title: "Slider",
				// data: result,
				errMsg: "Submitted successfully",
			});
		// });
	  } else {
		let msg = "Uploaded Failed";
		return res.render("../views/pages/slider", { title: "Slider", errMsg: msg });
	  }
	});
  } catch (error) {
	console.log(error);
  }
};

const getSlider = async (req, res) => {
	try {
	  await conn.connect(async (err) => {
		const sql = `SELECT * FROM slider `;
		await conn.query(sql, async (err, result) => {
		  res.render("../views/pages/slider", { title: "About", data: result });
		});
	  });
	} catch (error) {
	  console.log(error);
	}
  };
const sliderDelete = async (req, res) => {
	const id = req.params.id;
	// console.log(id);
	try {
	  await conn.connect(async (err) => {
		const sql = `DELETE FROM slider WHERE id='${id}'`;
		// console.log(sql);
		await conn.query(sql, async (err) => {
		  res.redirect("/slider", { title: "Slider", errMsg: 'Deleted Successfully'});
		});
	  });
	} catch (error) {
	  console.log(error);
	}
  };

module.exports = {slider,
	getSlider,
	sliderDelete,
}