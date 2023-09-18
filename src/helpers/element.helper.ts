/* eslint-disable no-case-declarations */
export enum ElementsEnum {
  Input = "INPUT",
  InputNUmber = "InputNUmber",
  Button = "BUTTON",
  Text = "TEXT",
}

export const UI_ELEMENTS = [
  {
    type: ElementsEnum.Input,
    label: "Input Field",
  },
  {
    type: ElementsEnum.InputNUmber,
    label: "Number Input",
  },
  {
    type: ElementsEnum.Button,
    label: "Button",
  },
  {
    type: ElementsEnum.Text,
    label: "Div Element",
  },
];

export function createElement(type: string) {
  switch (type) {
    case ElementsEnum.Button:
      const btn = document.createElement("button");
      btn.innerText = "Sample Button";
      return btn;
    case ElementsEnum.Input:
      const inputText = document.createElement("input");
      inputText.setAttribute("type", "text");
      inputText.setAttribute("placeholder", "enter text");
      return inputText;
    case ElementsEnum.InputNUmber:
      const InputNumber = document.createElement("input");
      InputNumber.setAttribute("type", "number");
      InputNumber.setAttribute("placeholder", "enter number");
      return InputNumber;
    case ElementsEnum.Text:
      const div = document.createElement("div");
      div.innerText = "Div With Sample Prefilled Text";
      return div;
    default:
      return;
  }
}
