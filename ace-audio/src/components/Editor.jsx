import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({ onChangeHandler, payloadPost }) => {
  function onChange(newValue) {
    onChangeHandler(newValue);
  }
  return (
    <div>
      <AceEditor
        style={{
          height: "300px",
          width: "100%",
          outline: "none",
          border: "2px solid #333",
          padding: "10px 20px",
          borderRadius: "5px",
          boxSizing: "border-box",
        }}
        placeholder="Enter Payload"
        mode="javascript"
        theme="monokai"
        onChange={onChange}
        value={`${payloadPost}`}
        fontSize={16}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default Editor;
