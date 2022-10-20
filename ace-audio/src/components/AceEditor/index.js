import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-monokai";


function Index({ mode, value, theme, onChange, readOnly, wrapEnabled, height= "84.5vh", width="100%" }) {
  return (
    <AceEditor
      mode={mode}
      theme={theme}
      onChange={onChange}
      readOnly={readOnly}
      value={value}
      showPrintMargin={false}
      highlightActiveLine={true}
      name="UNIQUE_ID_OF_DIV"
      width={width}
      wrapEnabled={wrapEnabled}
      height={height}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}
export default Index;
