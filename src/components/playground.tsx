import { useEffect, useRef, useState } from "react";
import {
  dragElement,
  dropEvent,
  preventEvent,
  updateElementEvents,
} from "../helpers/drag-events.helper";
import { useLocalStorage } from "../hooks/use-local-storage";
import { createElement } from "../helpers/element.helper";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
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
  const [lastSavedOn, SetlastSavedOn] = useState("");
  const [isToBeSave, SetisToBeSave] = useState(true);

  const [absolute, setAbsolute] = useLocalStorage<boolean>(
    absoluteStorageKey,
    true
  );

  const [
    storedElements,
    setStoredElements,
    //  , removeStoredElements
  ] = useState<IStoredElement[]>();
  //  useLocalStorage<IStoredElement[]>(storageKey, []);

  const removeStoredElements = () => {
    [];
  };

  const handleSave = () => {
    // const elements = document.querySelectorAll(".draggable");
    // const elementData: IStoredElement[] = [];

    // storedElements.forEach((element: any) => {
    //   const elementDetails: IStoredElement = {
    //     elementType: element.getAttribute(dragElement),
    //     positionType: element.style.position,
    //     left: element.style.left,
    //     top: element.style.top,
    //   };
    //   elementData.push(elementDetails);
    // });

    console.log({ storedElements }, "@handleSave");

    localStorage?.setItem(
      storageKey,
      JSON.stringify(
        storedElements?.map((x) => {
          return {
            ...x,
            positionType: absolute ? "absolute" : "static",
          };
        }) || []
      )
    );

    // setStoredElements((x) => x);

    const date = new Date();

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);
    localStorage?.setItem("lastSavedOn", JSON?.stringify(formattedDate));

    SetlastSavedOn(formattedDate);
    SetisToBeSave(true);

    toast.success("Saved!");
  };

  useEffect(() => {
    console.log(
      localStorage?.getItem(storageKey),
      "localStorage?.getItem(storageKey)"
    );
    if (localStorage?.getItem("lastSavedOn")) {
      let parsedDate = JSON?.parse(localStorage?.getItem("lastSavedOn") || "");

      SetlastSavedOn(parsedDate);
    }

    if (localStorage?.getItem("@-absoulte")) {
      let parsedPosition = JSON?.parse(
        localStorage?.getItem("@-absoulte") || ""
      );

      setAbsolute(!!parsedPosition);
    } else {
      setAbsolute(false);
    }

    if (localStorage?.getItem(storageKey)) {
      let parsedSavedElements = JSON?.parse(
        localStorage?.getItem(storageKey) as string
      );
      //   ? JSON?.parse(
      //   localStorage?.getItem(storageKey)||'' ) :[]
      // ;

      console.log({ parsedSavedElements }, "@useEffect");

      //   let elementData: IStoredElement[] = [];

      //   elementData = parsedSavedElements;

      console.log("@parsedSavedElements-local-storage", parsedSavedElements);

      setStoredElements(parsedSavedElements as IStoredElement[]);
    }
  }, []);

  const handleClear = () => {
    if (playgroundRef.current) {
      playgroundRef.current.innerHTML = "";
    }
    removeStoredElements();
    localStorage.clear();
    SetlastSavedOn("");
    setStoredElements([]);
    toast.success("cleared!");
  };

  const onChangePosition = (
    PositionType: String,
    // _storedElements: IStoredElement[],
    isAbsolute
  ) => {
    // const playground: HTMLElement | null =
    //   document?.getElementById("playground");

    // if (playgroundRef.current) {
    //   playgroundRef.current.innerHTML = "";
    // }
    setAbsolute(isAbsolute);
    console.log(
      { storedElements },
      "@onChangePosition",
      JSON.parse(localStorage.getItem(storageKey) || "")
    );
    if (PositionType && storedElements?.length) {
      setStoredElements(
        (x) =>
          x?.map((y) => {
            return {
              ...y,
              positionType: PositionType,
            };
          }) as IStoredElement[]
      );
    }

    SetisToBeSave(false);
  };

  // useEffect(() => {
  //   const elements = document.querySelectorAll(".draggable");
  //   const elementData: IStoredElement[] = [];

  //   elements.forEach((element: any) => {
  //     const elementDetails: IStoredElement = {
  //       elementType: element.getAttribute(dragElement),
  //       positionType: element.style.position,
  //       left: element.style.left,
  //       top: element.style.top,
  //     };
  //     elementData.push(elementDetails);
  //   });

  //   // setStoredValue(elementData as SetStateAction<T>);
  // }, []);

  useEffect(() => {
    if (storedElements?.length) {
      if (playgroundRef.current) {
        playgroundRef.current.innerHTML = "";
      }

      const playground = playgroundRef.current;
      if (!playground) return;
      const rect = playground.getBoundingClientRect();
      for (let index = 0; index < storedElements?.length; index++) {
        const item = storedElements[index];
        const element = createElement(item?.elementType);
        if (!element) continue;
        element.setAttribute(dragElement, item?.elementType);
        element.style.position = item?.positionType;
        element.style.left = item?.left;
        element.style.top = item?.top;
        updateElementEvents(element, rect);
        playground.appendChild(element);
      }
    }

    console.log({ storedElements }, "@storedElements@");
  }, [storedElements]);

  return (
    <>
      <div className=" font-bold relative  justify-center flex items-center text-[#5eabcb] py-4">
        GUI Builder
        <div className="text-sm absolute right-10 text-gray-300">
          {" "}
          {lastSavedOn ? "Last saved On:" : ""} {lastSavedOn}
        </div>
      </div>
      <div
        className="ui-container"
        id="playground"
        ref={playgroundRef}
        onDrop={(e) => {
          SetisToBeSave(false);
          const x = dropEvent(e, absolute);

          let _savedElemets: IStoredElement[] =
            storedElements as IStoredElement[];
          // JSON?.parse(
          //   localStorage?.getItem(storageKey) || ""
          // );

          let tosave = [...(_savedElemets?.length ? _savedElemets : []), x];

          console.log({ e }, "@drop", {
            x,
            tosave,
          });
          setStoredElements(tosave as IStoredElement[]);
        }}
        onDragOver={(e) => {
          console.log({ e }, "@onDragOver");
          preventEvent(e);
          SetisToBeSave(false);
        }}
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
          <span className="font-bold"> Position:</span>
          <label>
            <input
              type="radio"
              name="positionType"
              value="absolute"
              checked={absolute === true}
              onChange={() => {
                //, storedElements
                onChangePosition("absolute", true);
              }}
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
              onChange={() => {
                //, storedElements
                onChangePosition("static", false);
              }}
              className="mr-1"
            />
            static
          </label>
        </div>
        <button
          disabled={isToBeSave}
          className={
            ` rounded-lg !px-4 bg-[#5894cd] border-none focus:outline-[#5894cd81] text-white font-bold ` +
            (isToBeSave ? "cursor-not-allowed" : " ")
          }
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
