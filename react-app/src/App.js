// import logo from "./logo.svg";
// import "./App.css";
// import React from "react";
// import Upload from './Upload'
// import Upload from './components/Upload';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import Upload from "./components/Upload";
// import FileList from "./components/FileList";

function App() {
  return (
    <div>
      <Upload /> {/* Upload 컴포넌트만 렌더링 */}
      {/* <FileList /> */}
      {/* 파일 목록 컴포넌트 렌더링 */}
    </div>
  );
}

export default App;
