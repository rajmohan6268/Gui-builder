import { UI_ELEMENTS } from "../helpers/element.helper";
import { dragStart } from "../helpers/drag-events.helper";
import React from "react";

function LeftPanel() {
  const elementlist = [...UI_ELEMENTS];
  return (
    <>
      <div className="font-bold mt-16">Components</div>

      <div className="text-sm text-gray-300 py-5 px-2">
        Drag and Drop the Componets on board to add  and revese it to remove form board
      </div>
      <div className="list-container">
        {elementlist.map((elem) => (
          <div className="list-item" draggable={true} onDragStart={(e)=>dragStart(e,elem.type)} key={elem.type}>
            {elem.label}
          </div>
        ))}
      </div>
    </>
  );
}

export default LeftPanel;
