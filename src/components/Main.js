import React, { useState } from "react";
import { Gender } from "./Gender";
import { Revenue } from "./Revenue";
import { Users } from "./Users";

export const Main = ({ sameAreaUsers, areasObj }) => {
  const [optionState, setOptionState] = useState("none");

  function handleInput(e) {
    console.log(e.target.value);
    setOptionState(e.target.value);
  }
  return (
    <div id="main">
      <select name="chart-type" onInput={handleInput} value={optionState}>
        <option value="none" selected disabled hidden>
          Type of Chart
        </option>
        <option value="1">Revenue per area</option>
        <option value="2">Number of users per Area</option>
        <option value="3">Men and women Ratio</option>
      </select>
      {optionState === "1" && (
        <Revenue sameAreaUsers={sameAreaUsers} areasObj={areasObj} />
      )}
      {optionState === "2" && (
        <Users sameAreaUsers={sameAreaUsers} areasObj={areasObj} />
      )}
      {optionState === "3" && (
        <Gender sameAreaUsers={sameAreaUsers} areasObj={areasObj} />
      )}
    </div>
  );
};
