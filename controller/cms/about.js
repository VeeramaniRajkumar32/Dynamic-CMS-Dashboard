const conn = require("../../config/dbConn");

const about = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file.filename;
  try {
    await conn.connect(async (err) => {
      if (req.file) {
        // const insert = `INSERT INTO about (title,image,description) VALUES ('${title}','${image}','${description}')`
        // await conn.query(insert, async (err,result) =>{
        // console.log(result);
        const insert = `UPDATE about SET title='${title}',image='${image}',description='${description}' WHERE id='1'`;
        await conn.query(insert, async (err) => {
          if (err) throw err;
          const sql = `SELECT * FROM about WHERE id='1'`;
          // console.log(sql);
          await conn.query(sql, async (err, result) => {
            // const aboutData = Array();
            // result.map(data => {
            //   aboutData.push({title: data.title, image: data.image ? `../../public/uploads/about/${data.image}` : data.image, description: data.description });
            // })
            // console.log(result);
            res.render("../views/pages/about", {
              title: "About",
              data: result,
              errMsg: "submitted successfully",
            });
          });
        });
      } else {
        let msg = "Uploaded Failed";
        return res.render("../views/pages/about", { title: "About",errMsg: msg });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getAboutPage = async (req, res) => {
  try {
    await conn.connect(async (err) => {
      const sql = `SELECT * FROM about WHERE id='1'`;
      await conn.query(sql, async (err, result) => {
        res.render("../views/pages/about", { title: "About", data: result });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  about,
  getAboutPage,
};
