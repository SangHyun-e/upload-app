const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const multer = require("multer");
const cors = require("cors");
const sql = require("mssql");
const path = require("path");

// 파일 업로드 관련 모듈 IMPORT
// const uploadRouter = require("./react-app/src/components/Upload");
// app.use("/", uploadRouter);

// CORS 설정
app.use(cors());

// 파일 업로드를 저장할 디렉터리 설정
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads 디렉터리에 파일 저장
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // 파일 이름생성
  },
});

const upload = multer({ storage });

// 데이터베이스 연결 설정
const dbConfig = {
  user: "hanimac4xq",
  password: "magic4guard",
  server: "192.168.0.88\\hanimaccs2",
  database: "fileupload",
  stream: true,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

sql.connect(dbConfig, function (err) {
  if (err) {
    return console.error("error : ", err);
  }
  console.log("MSSQL 연결 완료");
});

// 파일 업로드 라우트 설정
app.post("/upload-multiple", upload.array("files"), async (req, res) => {
  const files = req.files.map((file) => ({
    Filename: file.filename,
    path: `uploads/${file.filename}`, // 파일의 경로를 설정
    originalname: file.originalname,
  }));
  let aliases = req.body.aliases; // 파일별 별칭을 받아옴
  console.log(req.body.aliases);

  if (typeof aliases === "string") {
    aliases = [aliases];
  }

  // 파일 업로드 및 데이터베이스 저장 비동기 처리
  (async () => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const alias = aliases[i] || "";

      var strL_Q = `
      insert fileupload..FileStorage (fileName, filePath, Alias, uploadDate)
      values ('${file.Filename}', '${file.path}', '${alias}', getdate())
      `;

      console.log(
        `filename: ${file.Filename} file.path : ${file.path} file.originalname : ${file.originalname} alias : ${alias}`
      );
      console.log(`${aliases[i]}`);
      await new sql.Request().query(strL_Q);
      // try {
      //   await new sql.Request().query(strL_Q);
      // } catch (error) {
      //   console.error("파일 업로드 에러", error);
      //   res.status(500).send("에러");
      //   return;
      // }
    }
  })();
  // 파일 업로드 성공 시 응답
  res.status(200).send({
    message: "파일 업로드 성공!",
  });
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

// var result = [];
// request.on('error', function (err) {
//   return console.log(err);
// }).on('row', (row) => {
//   result.push(row)
// }).on('done', () => {
//   return res.json(result);
// })
