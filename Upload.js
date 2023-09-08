function Upload() {
  // 파일 상태 관리
  const [file, setFile] = useState(null);
  // 파일 선택 핸들러

  const handleFileChange = (event) => {
    const selectedFile = event.target.file[0];
    setFile(selectedFile);
  };

  // 파일 업로드 핸들러 ( 서버로 파일 업로드 )
  if (file) {
    console.log("Uploading file", file.name);
  }
}

return (
  <div>
    <h1>파일 업로드 페이지</h1>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>파일 업로드</button>
  </div>
);
