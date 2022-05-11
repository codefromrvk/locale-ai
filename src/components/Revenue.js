import React, { useState } from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function getAreaId(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export const Revenue = ({ sameAreaUsers, areasObj }) => {
  const [placeName, setplaceName] = useState("none");
  const [chartData, setChartData] = useState(null);

  function handleInput(e) {
    setplaceName(e.target.value);
    let aread_id = getAreaId(areasObj, e.target.value);

    setChartData([
      {
        name: e.target.value,
        value: sameAreaUsers[aread_id].total_pros,
      },
    ]);
  }

  return (
    <>
      <select
        name="place-name"
        id="place-name"
        value={placeName}
        onInput={handleInput}
      >
        <option value="none" selected disabled hidden>
          Select Place
        </option>

        {Object.keys(sameAreaUsers).map((area) => {
          return <option>{areasObj[area]}</option>;
        })}
      </select>

      {placeName !== "none" && (
        <BarChart
          width={400}
          height={400}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            payload={[
              {
                value: "Number of users per area ",
                type: "square",
                color: "green",
              },
            ]}
          />
          <Bar barSize={20} dataKey="value" fill="#82ca9d" />
        </BarChart>
      )}
    </>
  );
};
