/* eslint-disable no-case-declarations */
export enum ElementsEnum {
  Input = "INPUT",
  InputNUmber = "InputNUmber",
  Inputpassword = "InputPassword",
  Button = "BUTTON",
  Text = "TEXT",
  Radio = "RADIO",
  CheckBox = "CHECKBOX",
  textarea = "TextArea",
  date = "date",

  Select = "Select",
  time = "time",

  file = "file",
  color = "color",
  // todo

  range = "range",
  image = "image",
  reset = "reset",
  search = "search",
}

export const UI_ELEMENTS = [
  {
    type: ElementsEnum.Input,
    label: "Input Text",
  },
  {
    type: ElementsEnum.InputNUmber,
    label: "Input Number",
  },
  {
    type: ElementsEnum.Inputpassword,
    label: "Input Password",
  },
  {
    type: ElementsEnum.textarea,
    label: "Text-area ",
  },
  {
    type: ElementsEnum.Select,
    label: "Select Dropdown",
  },

  {
    type: ElementsEnum.date,
    label: "date",
  },
  {
    type: ElementsEnum.file,
    label: "file",
  },
  {
    type: ElementsEnum.image,
    label: "image",
  },
  { type: ElementsEnum.range, label: "range" },
  { type: ElementsEnum.reset, label: "reset" },
  {
    type: ElementsEnum.search,
    label: "search",
  },
  { type: ElementsEnum.color, label: "color" },

  {
    type: ElementsEnum.time,
    label: "time",
  },

  {
    type: ElementsEnum.Radio,
    label: "Radio Button",
  },
  {
    type: ElementsEnum.CheckBox,
    label: "Check Box",
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
    case ElementsEnum.date:
      const inputdate = document.createElement("input");
      inputdate.setAttribute("type", "date");
      inputdate.setAttribute("placeholder", "Select date");
      return inputdate;
    case ElementsEnum.file:
      const inputfile = document.createElement("input");
      inputfile.setAttribute("type", "file");
      inputfile.setAttribute("placeholder", "Select file");
      return inputfile;
    case ElementsEnum.image:
      const inputimage = document.createElement("input");
      inputimage.setAttribute("type", "image");
      return inputimage;

    case ElementsEnum.range:
      const inputrange = document.createElement("input");
      inputrange.setAttribute("type", "range");
      return inputrange;
    case ElementsEnum.reset:
      const inputreset = document.createElement("input");
      inputreset.setAttribute("type", "reset");
      return inputreset;

    case ElementsEnum.search:
      const inputsearch = document.createElement("input");
      inputsearch.setAttribute("type", "search");
      inputsearch.setAttribute("placeholder", "Search text");

      return inputsearch;

    case ElementsEnum.color:
      const inputcolor = document.createElement("input");
      inputcolor.setAttribute("type", "color");
      inputcolor.setAttribute("placeholder", "Select color");
      return inputcolor;

    case ElementsEnum.time:
      const inputtime = document.createElement("input");
      inputtime.setAttribute("type", "time");
      inputtime.setAttribute("placeholder", "Select time");
      return inputtime;

    case ElementsEnum.InputNUmber:
      const InputNumber = document.createElement("input");
      InputNumber.setAttribute("type", "password");
      InputNumber.setAttribute("placeholder", "enter number");
      return InputNumber;
    case ElementsEnum.Inputpassword:
      const Inputpassword = document.createElement("input");
      Inputpassword.setAttribute("type", "password");
      Inputpassword.setAttribute("placeholder", "enter password");
      return Inputpassword;

    case ElementsEnum.Radio:
      const InputRadio = document.createElement("input");
      InputRadio.setAttribute("type", "radio");
      InputRadio.setAttribute("placeholder", "select");
      return InputRadio;

    case ElementsEnum.textarea:
      const Inputtextarea = document.createElement("textarea");
      Inputtextarea.setAttribute("placeholder", "enter Large Text");
      return Inputtextarea;

    case ElementsEnum.CheckBox:
      const InputCheckBox = document.createElement("input");
      InputCheckBox.setAttribute("type", "checkbox");
      InputCheckBox.setAttribute("placeholder", "select");
      return InputCheckBox;

    case ElementsEnum.Text:
      const div = document.createElement("div");
      div.innerText = "Div With Sample Prefilled Text";
      return div;

    case ElementsEnum.Select:
      const select = document.createElement("select");
      select.setAttribute("placeholder", "Select option");

      // Create option elements and add them to the select element
      const option0 = document.createElement("option");
      option0.value = "";
      option0.text = "Select option";
      option0.disabled = true;
      select.appendChild(option0);
      const option1 = document.createElement("option");
      option1.value = "1";
      option1.text = "Option 1";
      select.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = "2";
      option2.text = "Option 2";
      select.appendChild(option2);

      const option3 = document.createElement("option");
      option3.value = "3";
      option3.text = "Option 3";
      select.appendChild(option3);

      return select;

    default:
      return;
  }
}
