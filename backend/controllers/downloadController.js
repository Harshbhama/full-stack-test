const express = require("express");
const router = express.Router();

router.get("/:filename", (req, res) => { 
  const filePath = `${__dirname}/../images/${req.params.filename}`;
  res.download(
      filePath, 
      req.params.filename, // Remember to include file extension
      (err) => {
          if (err) {
              res.send({
                  error : err,
                  msg   : "Problem downloading the file"
              })
          }
  });
});

module.exports = router;