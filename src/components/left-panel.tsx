import { UI_ELEMENTS } from "../helpers/element.helper";
import { dragStart } from "../helpers/drag-events.helper";
import React from "react";

function LeftPanel() {
  const elementlist = [...UI_ELEMENTS];
  return (
    <>
      <div className="heading">UI Elements</div>
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
