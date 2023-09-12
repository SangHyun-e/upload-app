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
app.post("/upload-multiple", upload.array("files"), (req, res) => {
  const files = req.files.map((file) => ({
    Filename: file.filename,
    path: `uploads/${file.filename}`, // 파일의 경로를 설정
    originalname: file.originalname,
  }));

  const alias = req.body.alias;

  var strL_Q;
  for (const file of files) {
    strL_Q = `
    insert fileupload..FileStorage (fileName, filePath, Alias, uploadDate)
    values ('${file.Filename}', '${file.path}', '${alias}', getdate())
    `;

    console.log(
      `filename: ${file.Filename} file.path : ${file.path} file.originalname : ${file.originalname} alias : ${alias}`
    );
    var exec = new sql.Request();
    exec.query(strL_Q, (err) => {
      if (err) {
        res.send("에러");
      } else {
        res.send("성공");
      }
    });
    return true;
  }
});

// // 데이터베이스 연결 및 파일 정보 저장 함수
// async function connectToDatabaseAndSaveFiles(files) {
//   let pool;

//   try {
//     // 데이터베이스 연결 풀 생성
//     pool = await sql.connect(dbConfig);

//     // 연결 성공 로그 출력
//     console.log("MSSQL 연결 성공");

//     // 파일 정보를 데이터베이스에 저장
//     await saveFilesToDatabase(files, pool);

//     // 데이터베이스 연결 종료
//     await pool.close();
//   } catch (error) {
//     console.error("MSSQL 연결 에러", error);
//     if (pool) {
//       pool.close();
//     }
//     throw error;
//   }
// }

// // 파일 정보를 데이터베이스에 저장하는 함수
// async function saveFilesToDatabase(files, pools) {
//   try {
//     // 파일 정보를 데이터베이스에 저장하는 쿼리 작성

//     const query = `
//       INSERT INTO fileupload.FileStorage (FileName, FilePath, UploadDate)
//       VALUES (@FileName, @FilePath, @UploadDate)
//       `;
//     var strL_Q;

//     // 파일 정보를 하나씩 데이터베이스에 저장
//     for (const file of files) {
//       strL_Q = `
//       insert fileupload.FileStorage (fileName, filePath, uploadDate)
//       values ('${file.Filename}', '${file.path}', getdate())
//       `;
//       pools.query(query);

//       return true;
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// 기존 라우트와 서버 리스닝 코드
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
