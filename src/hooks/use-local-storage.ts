import { SetStateAction, useEffect, useState } from "react";
import { dragElement } from "../helpers/drag-events.helper";
import { IStoredElement } from "../components/playground";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

    setStoredValue(elementData as SetStateAction<T>);
  }, []);

  return [storedValue, setValue, removeValue] as const;
}
