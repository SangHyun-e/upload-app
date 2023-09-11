const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const multer = require("multer");
const cors = require("cors");

// 파일 업로드 관련 모듈 IMPORT
// const uploadRouter = require("./react-app/src/components/Upload");
// app.use("/", uploadRouter);

// CORS 설정
app.use(cors());

// 파일 업로드를 저장할 디렉터리 설정

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/"); // uploads 디렉터리에 파일 저장
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // 파일 이름생성
  },
});

const upload = multer({ storage });

// 파일 업로드 라우트 설정
app.post("/upload-multiple", upload.array("files"), (req, res) => {
  const files = req.files.map((file) => ({
    filename: file.filename,
    path: file.path,
  }));

  // 파일 정보를 데이터에 저장하는 로직 추가해야함

  res.json({ message: "파일 업로드 완료", files });
});

app.get("/", (req, res) => {
  res.send("Hello, Node.js server");
});

app.get("/api/data", (req, res) => {
  console.log("클라이언트로부터 요청이 왔습니다.");
  res.send("연결되었습니다.");
});

app.listen(port, () => {
  console.log(`Node.js 서버가 포트 ${port}에서 실행 중 입니다.`);
});

const sql = require("mssql");
const config = {
  user: "hanimac4xq",
  password: "magic4guard",
  server: "localhost",
  database: "fileupload",
  stream: true,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};
sql.connect(config, function(err) {
  if (err) {
    return console.error("error : ", err);
  }
  console.log("MSSQL 연결 완료");
});
