/* eslint-disable no-case-declarations */
export enum ElementsEnum {
  Input = "INPUT",
  Button = "BUTTON",
  Text = "TEXT",
}

export const UI_ELEMENTS = [
  {
    type: ElementsEnum.Input,
    label: "Input Field",
  },
  {
    type: ElementsEnum.Button,
    label: "Button",
  },
  {
    type: ElementsEnum.Text,
    label: "Text",
  },
];

export function createElement(type: string) {
  switch (type) {
    case ElementsEnum.Button:
      const btn = document.createElement("button");
      btn.innerText = 'Sample Button'
      return btn;
    case ElementsEnum.Input:
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      return input;
    case ElementsEnum.Text:
      const div = document.createElement("div");
      div.innerText = "Your Sample Text";
      return div;
    default:
      return;
  }
}
