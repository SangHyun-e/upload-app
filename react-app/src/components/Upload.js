import React, { Component } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: [], // 여러 파일 저장할 배열
    };
  }

  // 파일 입력 필드의 변경 이벤트 핸들러
  handleFileChange = (e) => {
    // 선택한 파일을 상태에 업데이트
    const files = Array.from(e.target.files);
    this.setState((prevState) => ({
      selectedFiles: [...prevState.selectedFiles, ...files],
    }));
  };

  // 파일 삭제 버튼 클릭 시, 실행 될 함수
  handleFileDelete = (file) => {
    this.setState((prevState) => {
      // 선택한 파일 목록에서 해당 파일을 제거
      const updatedFiles = prevState.selectedFiles.filter((f) => f !== file);
      return { selectedFiles: updatedFiles };
    });
  };

  // 업로드 버튼 클릭 시, 실행될 함수
  handleUpload = () => {
    console.log("버튼 클릭");
    const { selectedFiles } = this.state;
    if (selectedFiles.length > 0) {
      // 선택한 파일을 서버로 업로드하는 로직
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file); // 파일 이름을 file0, file1, ...로 저장
      });

      // Axios 사용해서 서버로 파일 업로드 요청
      axios
        .post("/upload-multiple", formData)
        .then((response) => {
          console.log("파일 업로드 성공!", response.data);
          // 업로드 완료되면 상태 초기화
          this.setState({ selectedFiles: [] });
        })
        .catch((error) => {
          // 업로드 중 에러가 발생한 경우 처리
          console.error("파일 업로드 에러", error);
        });
    } else {
      alert("파일을 선택하세요"); // 파일 선택 안할시 경고메세지
    }
  };

  render() {
    const { selectedFiles } = this.state;

    return (
      <div>
        <h2>파일 업로드</h2>
        {/* 파일 선택을 위한 입력 필드 (multiple 속성 추가) */}
        <input
          type="file"
          style={{ display: "none" }}
          onChange={this.handleFileChange}
          ref={(fileInput) => (this.fileInput = fileInput)}
          multiple // 여러 파일 선택 가능하게 함
        />
        {/* 업로드 버튼을 클릭하면 handleUpload 함수 실행 */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.fileInput.click()}
        >
          파일 선택
        </Button>
        <br />
        {/* 선택한 파일 목록 표시 */}
        {selectedFiles.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List>
                {selectedFiles.map((file, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemText primary={file.name} />
                    {/* 파일 삭제 버튼 */}
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => this.handleFileDelete(file)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
        {/* 업로드 버튼 */}
        <Button onClick={this.handleUpload} variant="contained" color="primary">
          업로드
        </Button>
      </div>
    );
  }
}

export default Upload;
