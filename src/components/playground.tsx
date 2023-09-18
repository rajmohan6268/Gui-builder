import { useRef } from "react";
import { dropEvent, preventEvent } from "../helpers/drag-events.helper";
import React from "react";

function Playground() {
  const playgroundRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {};

  const handleClear = () => {};

  return (
    <>
      <div className="p-1 mb-4 font-bold ">GUI Builder Playground</div>
      <div
        className="ui-container"
        id="playground"
        ref={playgroundRef}
        onDrop={(e) => dropEvent(e)}
        onDragOver={preventEvent}
      />
      <div className="h-full">
        <button type="button" onClick={handleClear}>
          Clear All
        </button>

        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
}

export default Playground;
