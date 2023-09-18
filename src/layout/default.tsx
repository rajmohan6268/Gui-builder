import React from "react";
import "./default.css";

interface PropType {
  sidePanel: JSX.Element;
  playground: JSX.Element;
  // rightPanel: JSX.Element;
}
function DefaultLayout(props: PropType) {
  return (
    <div className="default-layout">
      <div  className="side-panel">{props.sidePanel}</div>
      <div  className="playground">{props.playground}</div>
      {/* <div className="right-panel">{props.rightPanel}</div> */}
    </div>
  );
}

export default DefaultLayout;
