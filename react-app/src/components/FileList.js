// import React, { Component } from "react";
// import axios from "axios";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { response } from "express";

// const serverUrl = "http://localhosts:3000";

// class FileList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       fileList: [], // 파일 정보 목록을 저장할 상태
//       selectedFileId: null, // 선택한 파일의 ID를 저장할 상태
//       downloading: false, // 다운로드 중 여부를 나타내는 상태
//     };
//   }

//   componentDidMount() {
//     // 파일 정보를 가져오는 GET 요청을 서버에 보냄.
//     axios
//       .get(`${serverUrl}/file-list`)
//       .then((response) => {
//         this.setState({ fileList: response.data });
//       })
//       .catch((error) => {
//         console.error("파일 정보 가져오기 에러", error);
//       });
//   }

//   handleFileClick = (fileId) => {
//     this.setState({ selectedFileId: fileId });
//   };

//   handleDownload = () => {
//     const { selectedFileId } = this.state;

//     // 선택한 파일의 ID를 서버에 전송하여 다운로드 요청
//     axios
//       .get(`${serverUrl}/download/${selectedFileId}`, {
//         responseType: "blob", // 파일 다운로드를 위한 설정
//       })
//       .then((response) => {
//         const blob = new Blob([response.data]);
//         const url = window.URL.createObjectURL(blob);

//         // 다운로드 링크 생성
//         const a = document.createElement("a");
//         a.style.display = "none";
//         a.href = url;
//         a.download = "downloaded-file"; // 다운로드 되는 파일명 설정
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       })
//       .catch((error) => {
//         console.error("파일 다운로드 에러", error);
//       });
//   };
//   render() {
//     const { fileList, selectedFileId, downloading } = this.state;

//     return (
//       <div>
//         <h2>파일 목록</h2>
//         <List>
//           {fileList.map((file) => (
//             <ListItem
//               key={file.ID}
//               button
//               onClick={() => this.handleFileClick(file.ID)}
//               selected={file.ID === selectedFileId}
//             >
//               <ListItemText primary={file.fileName} />
//             </ListItem>
//           ))}
//           {selectedFileId && (
//             <div>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={this.handleDownload}
//                 disabled={downloading}
//               >
//                 {downloading ? (
//                   <CircularProgress size={24} />
//                 ) : (
//                   "선택한 파일 다운로드"
//                 )}
//               </Button>
//             </div>
//           )}
//         </List>
//       </div>
//     );
//   }
// }

// export default FileList;
