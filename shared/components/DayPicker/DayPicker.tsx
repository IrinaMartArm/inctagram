import React, { useState } from "react";
import { DayPicker as ReactDayPicker } from "react-day-picker";

import { format } from "date-fns";

import "react-day-picker/dist/style.css";

type ValuePiece = Date | null;

type Value = [ValuePiece, ValuePiece] | ValuePiece;

export const DayPicker = () => {
  const [selected, setSelected] = useState<Date>();

  let footer = <p>Please pick a day.</p>;

  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  const css = `
  .my-selected { 
     background-color: #234E99;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    background-color: #171717;
    color: #234E99;
  }
  .my-disabled {
      background-color: red;
      color: #234E99; 
  }
`;

  return (
    <>
      <style>{css}</style>
      <ReactDayPicker
        mode={"single"}
        modifiersClassNames={{
          disabled: "my-disabled",
          selected: "my-selected",
          today: "my-today",
        }}
        onSelect={setSelected}
        selected={selected}
        styles={{
          caption: { color: "#FFFFFF" },
          nav_button_next: { background: "#4C4C4C" },
          nav_button_previous: { background: "#4C4C4C" },
          root: { background: "#171717", maxWidth: "fit-content" },
          table: { color: "#FFFFFF" },
        }}
        /*modifiersClassNames={{
        today: s.today
        }}*/
      />
    </>
  );
};
