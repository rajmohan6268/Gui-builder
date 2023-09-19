import { createElement } from "./element.helper";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const PLAYGROUND_ID = "";

const dragStatus = "text/plain";
export const dragElement = "element-type";

export function dragStart(
  event: React.DragEvent<HTMLDivElement> | undefined,
  type: string,
  uid: string
) {
  if (event) {
    event.dataTransfer.setData(dragStatus, "dragging");
    event.dataTransfer.setData(dragElement, type);
    event.dataTransfer.setData("uid", uid);
  }
}

/**
 *@description preventing event used in this case to allow drop
 */
export function preventEvent(event: any) {
  event.preventDefault();
}

/**
 *@description updateElementEvents  function args1 elements args2 elementa
 */
export function updateElementEvents(
  element: HTMLDivElement | HTMLButtonElement | undefined,
  rect: DOMRect
) {
  if (!element) return;
  element.addEventListener("mousedown", (e: any) => {
    let isDragging = false;
    let offsetX: number, offsetY: number;

    // Calculate the initial offset from the mouse position
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;

    // Set the element to be draggable
    element.style.cursor = "grab";

    // Start dragging
    isDragging = true;

    document.addEventListener("mousemove", moveElement);


    document.addEventListener("mouseup", (e) => {
      isDragging = false;
      element.style.cursor = "grab";
      console.log("@mouseup", e);

      const uid = e?.target?.getAttribute("uid");

      if (uid !== null) {
        console.log("UID:", uid);

        const x = e.clientX - offsetX - rect.left;
        const y = e.clientY - offsetY - rect.top;

        const left = (element.style.left = x + "px");
        const top = (element.style.top = y + "px");

        const customEvent = new CustomEvent("onEvementReposition", {
          detail: { message: "onEvementReposition", uid, left, top },
        });
        document.dispatchEvent(customEvent);
      }

      document.removeEventListener("mousemove", moveElement);
    });

    function moveElement(
      e: MouseEvent
    ) {
      console.log({ e }, "@moveElement", { e });
      if (!isDragging || !element) return;

      const x = e.clientX - offsetX - rect.left;
      const y = e.clientY - offsetY - rect.top;

      const left = (element.style.left = x + "px");
      const top = (element.style.top = y + "px");

      return {
        left,
        top,
      };
    }
  });
}

export function dropEvent(
  event: React.DragEvent<HTMLDivElement>,
  absolute: boolean
) {
  if (event) {
    event.preventDefault();

    const status = event.dataTransfer.getData(dragStatus);
    const elementType = event.dataTransfer.getData(dragElement);
    const elementuid = event.dataTransfer.getData("uid");
    console.log({ status, elementType, elementuid }, "@dropEvent");

    if (status === "dragging" && elementType) {
      const element = createElement(elementType);
      if (!element) return;
      element.setAttribute(dragElement, elementType);
      element.setAttribute("uid", elementuid);
      const dropTarget = event.currentTarget;
      const rect = dropTarget.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      element.className = "draggable";

      if (absolute) {
        element.style.position = "absolute";
      } else {
        element.style.position = "static";
      }
      element.style.left = mouseX + "px";
      element.style.top = mouseY + "px";

      dropTarget.appendChild(element);

      //component draggable if absolute
      if (absolute) {
        updateElementEvents(element, rect);
      }

      return {
        left: element.style.left,
        top: element.style.top,
        elementType,
        positionType: absolute ? "absolute" : "static",
        uid: elementuid,
      };
    }
  }
}
