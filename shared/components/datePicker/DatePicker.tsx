import { useState } from "react";
import { DayPicker } from "react-day-picker";

import { format } from "date-fns";

import "react-day-picker/dist/style.css";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

export const DatePicker = () => {
  const [selected, setSelected] = useState<Date>();

  let footer = <p>Please pick a day.</p>;

  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  return (
    <DayPicker
      footer={footer}
      mode={"single"}
      onSelect={setSelected}
      selected={selected}
    />
  );
};
