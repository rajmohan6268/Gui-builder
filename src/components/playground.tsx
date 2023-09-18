import { useEffect, useRef } from "react";
import {
  dragElement,
  dropEvent,
  preventEvent,
  updateElementEvents,
} from "../helpers/drag-events.helper";
import { useLocalStorage } from "../hooks/use-local-storage";
import { createElement } from "../helpers/element.helper";
import React from "react";
const storageKey = "@-playground";
const absoluteStorageKey = "@-absoulte";

export interface IStoredElement {
  elementType: string;
  left: string;
  top: string;
  positionType: string;
}

function Playground() {
  const playgroundRef = useRef<HTMLDivElement>(null);
  const [absolute, setAbsolute] = useLocalStorage<boolean>(
    absoluteStorageKey,
    true
  );

  const [storedElements, setStoredElements, removeStoredElements] =
    useLocalStorage<IStoredElement[]>(storageKey, []);

  useEffect(() => {
    if (storedElements.length) {
      const playground = playgroundRef.current;
      if (!playground) return;
      const rect = playground.getBoundingClientRect();
      for (let index = 0; index < storedElements.length; index++) {
        const item = storedElements[index];
        const element = createElement(item.elementType);
        if (!element) continue;
        element.setAttribute(dragElement, item.elementType);
        element.style.position = item.positionType;
        element.style.left = item.left;
        element.style.top = item.top;
        updateElementEvents(element, rect);
        playground.appendChild(element);
      }
    }
  }, [storedElements]);

  const handleSave = () => {
    const elements = document.querySelectorAll(".draggable");
    const elementData: IStoredElement[] = [];

    elements.forEach((element: any) => {
      const elementDetails: IStoredElement = {
        elementType: element.getAttribute(dragElement),
        positionType: element.style.position,
        left: element.style.left,
        top: element.style.top,
      };
      elementData.push(elementDetails);
    });

    setStoredElements(elementData);
  };

  const handleClear = () => {
    if (playgroundRef.current) {
      playgroundRef.current.innerHTML = "";
    }
    removeStoredElements();
  };

  useEffect(()=>{

  },[])

  return (
    <>
      <div className=" font-bold text-[#5eabcb] py-4">GUI Builder</div>
      <div
        className="ui-container"
        id="playground"
        ref={playgroundRef}
        onDrop={(e) => dropEvent(e, absolute)}
        onDragOver={preventEvent}
      />
      <div className=" flex items-center space-x-2 justify-center mt-1">
        <button
          style={{
            borderColor: "#5894cd",
          }}
          type="button"
          className="rounded-lg text-[#5894cd]  font-bold"
          onClick={handleClear}
        >
          Clear All
        </button>
        <div className="flex font-medium  items-center space-x-4 px-4">
        <span className="font-bold">  Position:</span>
          <label>
            <input
              type="radio"
              name="positionType"
              value="absolute"
              checked={absolute === true}
              onChange={() => setAbsolute(true)}
              className="mr-1"
              
            />
            Absolute
          </label>
          <label>
            <input
              type="radio"
              name="positionType"
              value="relative"
              checked={absolute === false}
              onChange={() => setAbsolute(false)}
              className="mr-1"
             
            />
            Relative
          </label>
        </div>
        <button  className="rounded-lg !px-4 bg-[#5894cd] border-none focus:outline-[#5894cd81]   text-white font-bold" type="button" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
}

export default Playground;
