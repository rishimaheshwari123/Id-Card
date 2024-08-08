const multer = require("multer")

const storage = multer.memoryStorage();

// const upload = multer({ storage: storage }).single("file");

const upload = multer({ storage: storage }).array("file",1000);

module.exports = upload;