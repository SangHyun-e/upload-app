const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, Node.js server");
});

app.listen(port, () => {
  console.log(`Node.js 서버가 포트 ${port}에서 실행 중 입니다.`);
});
