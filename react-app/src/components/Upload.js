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
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const serverUrl = "http://localhost:3000";

axios
  .get(`${serverUrl}/api/data`)
  .then((response) => {
    console.log("서버 응답", response.data);
  })
  .catch((error) => {
    console.error("요청 에러", error);
  });

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: [], // 선택한 파일 목록
      aliases: [], // 파일 별 별칭 목록
      errorMessage: "", // 오류 메시지
    };
  }

  // 파일 선택 시 실행되는 함수
  handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const { aliases } = this.state;
    const newAliases = selectedFiles.map(() => "");

    this.setState({
      selectedFiles,
      aliases: [...aliases, ...newAliases],
      errorMessage: "",
    });
  };

  // 별칭 입력 시 실행되는 함수
  handleAliasChange = (e, index) => {
    console.log("별칭 변경 - 인덱스:", index);
    const { aliases } = this.state;
    aliases[index] = e.target.value;
    console.log("별칭 값:", e.target.value);
    this.setState({ aliases });
  };

  // 파일 삭제 버튼 클릭 시 실행되는 함수
  handleFileDelete = (index) => {
    const { selectedFiles, aliases } = this.state;
    selectedFiles.splice(index, 1); // 해당 파일 제거
    aliases.splice(index, 1); // 해당 파일의 별칭 제거
    this.setState({ selectedFiles, aliases });
  };

  // 업로드 버튼 클릭 시 실행되는 함수
  handleUpload = () => {
    const { selectedFiles, aliases } = this.state;

    if (selectedFiles.length === 0) {
      alert("파일을 선택하세요");
      return;
    }

    // 별칭을 입력하지 않은 경우 오류 메시지 표시
    if (aliases.some((alias) => alias === "")) {
      this.setState({
        errorMessage: "모든 파일에 별칭을 입력해주세요",
      });
      return;
    }

    // FormData를 사용하여 서버로 업로드 요청 보냄
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append("files", file);
      formData.append("aliases", aliases[index]);
    });

    axios
      .post(`${serverUrl}/upload-multiple`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("파일 업로드 성공!", response.data);

        // 업로드 성공 시 alert창 표시
        alert("파일이 성공적으로 업로드 되었습니다.");

        // 업로드 완료 후 상태 초기화
        this.setState({
          selectedFiles: [],
          aliases: [],
          errorMessage: "",
        });
      })
      .catch((error) => {
        console.error("파일 업로드 에러", error);
      });
  };

  render() {
    const { selectedFiles, aliases, errorMessage } = this.state;

    return (
      <div>
        <h2>파일 업로드</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={this.handleFileChange}
              ref={(fileInput) => (this.fileInput = fileInput)}
              multiple
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.fileInput.click()}
            >
              파일 선택
            </Button>
          </Grid>
          <Grid item xs={12}>
            <List>
              {selectedFiles.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.name} />
                  <TextField
                    label="별칭"
                    value={aliases[index]}
                    onChange={(e) => this.handleAliasChange(e, index)}
                    variant="outlined"
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => this.handleFileDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <Button onClick={this.handleUpload} variant="contained" color="primary">
          업로드
        </Button>
      </div>
    );
  }
}

export default Upload;
