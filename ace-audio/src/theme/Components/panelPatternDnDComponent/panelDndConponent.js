import React, { useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const imgP =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/LetterP.svg/1200px-LetterP.svg.png";

function DnDPanel({ patterns, setPattern, handleResponseChange }) {
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(patterns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPattern(items);
  }
  return (
    <div
      className="DnDPanel"
      style={{
        overflowY: "visible",
      }}
    >
      <header className="DnDPanel-header">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="foundGuidis">
            {(provided) => (
              <div
                className="foundGuidis"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {patterns?.map((pattern, i) => {
                  return (
                    <Draggable
                      pattern={pattern}
                      key={`${pattern.guid}${i}`}
                      draggableId={`${pattern.guid}${i}`}
                      index={i}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            className="foundGuidis-thumb"
                            onDoubleClick={() => handleResponseChange(pattern)}
                          >
                            <img
                              src={imgP}
                              alt={`${pattern.guid} Thumb`}
                              style={{
                                width: 10 + "px",
                                height: "auto",
                              }}
                            />
                            {pattern.pattern?.tracks?.length ? (
                              <>
                                <span>
                                  Assets : {pattern.pattern.tracks.length}
                                </span>
                                <br />
                                <span>Name: {pattern.pattern.name}</span>
                                <br />
                                <span>User: {pattern.pattern.o_username}</span>
                              </>
                            ) : (
                              <span>
                                Patterns : <br />{" "}
                                {pattern.sequence.patterns.map((pattern, i) => {
                                  return (
                                    <span>
                                      {pattern.guid} <br />
                                    </span>
                                  );
                                })}
                              </span>
                            )}
                            <p
                              style={{
                                overflow: "hidden",
                              }}
                            >
                              <div>
                                {pattern.pattern?.guid
                                  ? pattern.pattern.guid
                                  : pattern.sequence.guid}
                              </div>
                            </p>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default DnDPanel;
