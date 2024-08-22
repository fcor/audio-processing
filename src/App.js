import React, { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import "./App.css";

const apiUrl = "http://localhost:5000/upload";

function App() {
  const [keywords, setKeywords] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleUpload = (e) => {
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = () => {
    const cleanKeywords = keywords.split(",").filter((item) => item.trim() !== "");
    setFileList([
      ...fileList,
      {
        fileName: fileName,
        keywords: cleanKeywords,
      },
    ]);
    setFileName("");
    setKeywords("");
  };

  const handleExport = () => {
    console.log(fileList);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fileList),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="app">
      <h1 className="title">Audio to text</h1>
      <p className="text">Select the audio file and introduce the keywords</p>

      <div className="files-grid">
        <div className="grid-header">
          <p className="grid-title">File</p>
        </div>
        <div className="grid-header">
          <p className="grid-title">Keywords</p>
        </div>
        {/* <div className="grid-header">
          <p className="grid-title">Actions</p>
        </div> */}

        {fileList.length === 0 && (
          <div className="grid-element">
            <p className="grid-text">No files loaded yet!</p>
          </div>
        )}

        {fileList.map((file) => {
          return (
            <React.Fragment key={file.fileName}>
              <div className="grid-element">
                <p className="grid-text">{file.fileName}</p>
              </div>

              <div className="grid-element">
                <p className="grid-text">{file.keywords}</p>
              </div>

              {/* <div className="grid-element">
                <p className="grid-text">DELETE</p>
              </div> */}
            </React.Fragment>
          );
        })}
      </div>
      <div className="upload-container">
        <div className="file-input-box row">
          <Button handleClick={handleUpload} variant="input" extensions=".m4a">
            Select file
          </Button>
          <p className="filename">{fileName}</p>
        </div>
        <Input
          placeholder="Fancy keywords"
          value={keywords}
          onChange={(text) => setKeywords(text)}
          label="Keywords"
          variant="dark"
        />
        <Button handleClick={handleSubmit}>Submit</Button>
      </div>
      <Button handleClick={handleExport}>Export files</Button>
    </div>
  );
}

export default App;
