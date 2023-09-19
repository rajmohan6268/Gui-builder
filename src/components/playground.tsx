import React, { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  dragElement,
  dropEvent,
  preventEvent,
  updateElementEvents,
} from "../helpers/drag-events.helper";
import { useLocalStorage } from "../hooks/use-local-storage";
import { createElement } from "../helpers/element.helper";

const storageKey = "@-playground";
const tempstorageKey = "@-temp-playground";

const absoluteStorageKey = "@-absolute";

interface IStoredElement {
  elementType: string;
  left: string;
  top: string;
  positionType: string;
  uid: string;
}

function Playground() {
  const playgroundRef = useRef<HTMLDivElement>(null);
  const [lastSavedOn, setLastSavedOn] = useState<string | null>(null);
  const [isToBeSaved, setIsToBeSaved] = useState(true);

  const [absolute, setAbsolute] = useLocalStorage<boolean>(
    absoluteStorageKey,
    true
  );

  const [storedElements, setStoredElements] = useState<IStoredElement[]>([]);

  const removeStoredElements = () => {
    setStoredElements([]);
  };

  const handleSave = () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(
        storedElements.map((x) => ({
          ...x,
          positionType: absolute ? "absolute" : "static",
        }))
      )
    );

    const formattedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    localStorage.setItem("lastSavedOn", JSON.stringify(formattedDate));
    setLastSavedOn(formattedDate);
    setIsToBeSaved(true);

    toast.success("Saved!");
  };

  useEffect(() => {
    const parsedDate = JSON.parse(
      localStorage.getItem("lastSavedOn") || "null"
    );
    if (parsedDate) {
      setLastSavedOn(parsedDate);
    }

    const parsedPosition = JSON.parse(
      localStorage.getItem(absoluteStorageKey) || "false"
    );
    setAbsolute(!!parsedPosition);

    const parsedSavedElements = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    );
    setStoredElements(parsedSavedElements);
  }, []);

  const handleClear = () => {
    if (playgroundRef.current) {
      playgroundRef.current.innerHTML = "";
    }
    removeStoredElements();
    localStorage.clear();
    setLastSavedOn("");
    setIsToBeSaved(false);
    toast.success("Cleared!");
  };

  const onChangePosition = (positionType: string, isAbsolute: boolean) => {
    setAbsolute(isAbsolute);

    if (positionType && storedElements.length) {
      setStoredElements((x) =>
        x.map((y) => ({
          ...y,
          positionType,
        }))
      );
    }

    setIsToBeSaved(false);
  };

  useEffect(() => {
    if (storedElements.length) {
      const playground = playgroundRef.current;
      if (!playground) return;

      const rect = playground.getBoundingClientRect();
      playground.innerHTML = "";

      storedElements.forEach((item) => {
        const element = createElement(item.elementType);
        if (!element) return;

        element.setAttribute(dragElement, item.elementType);
        element.setAttribute("uid", item.uid);
        element.style.position = item.positionType;
        element.style.left = item.left;
        element.style.top = item.top;

        updateElementEvents(element, rect);
        playground.appendChild(element);
      });

      localStorage.setItem(tempstorageKey, JSON.stringify(storedElements));
    }
  }, [storedElements]);

  useEffect(() => {
    const handleonEvementReposition = (event) => {
      const data = event.detail;
      const parsedTOBeSavedElements = JSON.parse(
        localStorage.getItem(tempstorageKey) || "[]"
      );
      const { uid, left, top } = data;

      const TobeSaved = parsedTOBeSavedElements?.map((obj) => {
        if (obj.uid == uid) {
          return {
            ...obj,
            left: left,
            top: top,
          };
        }
        return obj;
      });
      console.log("@@Received custom event:", data, uid, left, top);

      setStoredElements(() => TobeSaved);
      setIsToBeSaved(false);

      console.log("@@", { storedElements });
    };

    document.addEventListener("onEvementReposition", handleonEvementReposition);

    return () => {
      document.removeEventListener(
        "onEvementReposition",
        handleonEvementReposition
      );
    };
  }, []);

  return (
    <>
      <div className="font-bold relative justify-center flex items-center text-[#5eabcb] py-4">
        GUI Builder
        <div className="text-sm absolute right-10 text-gray-300">
          {lastSavedOn ? `Last saved On: ${lastSavedOn}` : ""}
        </div>
      </div>
      <div
        className="ui-container"
        id="playground"
        ref={playgroundRef}
        onDrop={(e) => {
          setIsToBeSaved(false);
          const x = dropEvent(e, absolute);

          const savedElements = [...(storedElements || []), x];
          setStoredElements(savedElements);
        }}
        onDragOver={(e) => {
          preventEvent(e);
          setIsToBeSaved(false);
        }}
      />
      <div className="flex items-center space-x-2 justify-center mt-1">
        <button
          style={{
            borderColor: "#5894cd",
          }}
          type="button"
          className="rounded-lg text-[#5894cd] font-bold"
          onClick={handleClear}
        >
          Clear All
        </button>
        <div className="flex font-medium items-center space-x-4 px-4">
          <span className="font-bold">Position:</span>
          <label>
            <input
              type="radio"
              name="positionType"
              value="absolute"
              checked={absolute === true}
              onChange={() => onChangePosition("absolute", true)}
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
              onChange={() => onChangePosition("static", false)}
              className="mr-1"
            />
            Static
          </label>
        </div>
        <button
          disabled={isToBeSaved}
          className={`rounded-lg !px-4 bg-[#5894cd] border-none focus:outline-[#5894cd81] text-white font-bold ${
            isToBeSaved ? "cursor-not-allowed" : ""
          }`}
          type="button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default Playground;
