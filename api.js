// const express = require("express");
// const app = express();
// const uuidAPIKey = require("uuid-apikey");

// const server = app.listen(3000, () => {
//   console.log("Start Server : localhost:3000");
// });

// console.log(uuidAPIKey.create());

// const key = {
//   apiKey: "SMC7YMF-4S0M314-HF5S8AC-B3FA7D8",
//   uuid: "cd187f51-2641-4184-8bcb-942958dea3b5",
// };

// app.get("/api/users/dd", (req, res) => {
//   console.log(req.query.kind);
//   if (req.query.kind == "1") {
//     res.send("aaa");
//   } else {
//     res.send("sss");
//   }
// });

// app.get("/api/users/:apikey/:type", async (req, res) => {
//   // url path, async(요청, 응답)
//   let { apikey, type } = req.params;

//   if (uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
//     res.send("apikey is not valid.");
//   } else {
//     if (type == "seoul") {
//       let data = [
//         {
//           name: "홍길동",
//           city: "seoul",
//         },
//         {
//           name: "김철수",
//           city: "seoul",
//         },
//       ];
//       res.send(data);
//     } else if (type == "jeju") {
//       let data = [
//         {
//           name: "박지성",
//           city: "jeju",
//         },
//         {
//           name: "손흥민",
//           city: "jeju",
//         },
//       ];
//       res.send(data);
//     } else {
//       res.send("Type is not correct.");
//     }
//   }
// });

// app.get("/api/sales/:apikey/:year", async (req, res) => {
//   // url path, async(요청, 응답)
//   let { apikey, year } = req.params;

//   if (year == "2019") {
//     let data = [
//       {
//         product: "반도체",
//         amount: 3928840000,
//       },
//       {
//         product: "냉장고",
//         amount: 28840000,
//       },
//     ];
//     res.send(data);
//   } else if (year == "2020") {
//     let data = [
//       {
//         product: "반도체",
//         amount: 928840000,
//       },
//       {
//         product: "냉장고",
//         amount: 940000,
//       },
//     ];
//     res.send(data);
//   } else {
//     res.send("Type is not correct.");
//   }
// });

const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("downloads"));

app.get("/download", (req, res) => {
  console.log("Request Path:", req.path);
  const fileName = req.query.file;
  if (!fileName) {
    res.status(400).send("파일 이름을 지정하세요.");
    return;
  }

  let filePath = "";

  switch (fileName) {
    case "hira_ddmd_setup.exe":
      filePath = path.join(__dirname, "downloads", "hira_ddmd_setup.exe");
      break;
    case "hira_iea_setup_20221014.exe":
      filePath = path.join(
        __dirname,
        "downloads",
        "hira_iea_setup_20221014.exe"
      );
      break;
    case "XecureCPS.exe":
      filePath = path.join(__dirname, "downloads", "XecureCPS.exe");
      break;
    case "표준창사용_IHiraDurSetup.20230523.exe":
      filePath = path.join(
        __dirname,
        "downloads",
        "표준창사용_IHiraDurSetup.20230523.exe"
      );
      break;
    default:
      res.status(404).send("파일을 찾을 수 없습니다.");
      return;
  }

  // filePath = path.join(__dirname, "downloads", filePath);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).send("파일을 찾을 수 없습니다.");
    }
  });
});

const server = app.listen(3000, () => {
  console.log("Start Server : localhost:3000");
});

// app.get("/api/users/dd", (req, res) => {
//   console.log(req.query.kind);
//   if (req.query.kind == "1") {
//     res.send("aaa");
//   } else {
//     res.send("sss");
//   }
// });
