

import React from "react";

function Playground() {


  return (
    <>
      <div className="p-1 mb-4 font-bold">GUI Builder Playground</div>
      <div
        className="ui-container"
        id="playground"
     
      />
      <div className="h-full">
        <button type="button" >
          Clear All
        </button>
        <input
          type="checkbox"
        
        />
        <button type="button" >
          Save
        </button>
      </div>
    </>
  );
}

export default Playground;
