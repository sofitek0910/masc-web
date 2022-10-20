import React from "react";
import ResizePanel from "react-resize-panel";
import Editor from "../../Editor/Editor";
import ReactFlow, {
  Background,
  removeElements,
  addEdge,
  Controls,
} from "react-flow-renderer";

import { INITIAL_ELEMENTS } from "./constant";

const onLoad = (reactFlowInstance) => {
  // reactFlowInstance.fitView();
  // console.log(reactFlowInstance.getElements());
};

const Index = ({
  handleInputChange,
  handleSendRequest,
  handleRequestChange,
}) => {
  const [elements, setElements] = React.useState(INITIAL_ELEMENTS);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  return (
    <div className="editor-section">
      <div className="flexbox">
        <div className="one">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            id="aboveditor"
          >
            <ResizePanel direction="s" handleClass="customHandle">
              <ReactFlow
                elements={elements}
                onLoad={onLoad}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                minZoom={0.2}
              >
                <Background color="#aaa" gap={16} />
                <Controls />
              </ReactFlow>
            </ResizePanel>
          </div>
          <Editor
            getLink={handleInputChange}
            onClick={handleSendRequest}
            showRequestBar={true}
            handleRequestChange={handleRequestChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
