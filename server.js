import express from "express";
import fs from "fs";
import multer from "multer";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const uploadDir = "uploads/";
const fileName = "links.csv";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, fileName);
  },
});


const upload = multer({ storage });

app.post("/addCSVfile", upload.single("csvFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No CSV file uploaded." });
  }
  res.send({massage: "YOUR DATA.CSV WAS SUCCESFULLY ADDED"})
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


