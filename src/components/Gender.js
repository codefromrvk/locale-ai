import React,{useState} from 'react'
import { PieChart, Pie, Cell, Legend } from "recharts";

import "./gender.css"
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 }
];
function getAreaId(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export const Gender = ({sameAreaUsers,areasObj}) => {
  const [placeName,setplaceName]= useState("none")
  const [chartData,setChartData]= useState(null)
  console.log("c",chartData)

  function handleInput(e){
    setplaceName(e.target.value)
    let aread_id = getAreaId(areasObj,e.target.value);

    setChartData([{
      name:"Male",
      value:sameAreaUsers[aread_id].male_count
    },
    {
      name:"Female",
      value:sameAreaUsers[aread_id].female_count
    }
  ])
  }

  return (<>
  <select name="place-name"id="place-name" value={placeName} onInput={handleInput}>
    <option value="none" selected disabled hidden>Select Place</option>
  
     { Object.keys(sameAreaUsers).map(area=>{
       return <option>{areasObj[area]}</option>
     })}
  
    </select>
    {(placeName!=="none")&&<div id="pie-chart" ><PieChart width={500} height={500}>
    <Pie
      data={chartData}
      cx={270}
      cy={270}
      labelLine={false}
      label={renderCustomizedLabel}
      fill="#8884d8"
      dataKey="value"
    >
      {chartData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
  <div id="legend-box" style={{display:'flex'}}>
    <span style={{display:'flex'}}> <div id="min" style={{width:"20px",height:"20px",backgroundColor:COLORS[0]}}></div>
      Male</span>
    <span style={{display:'flex'}}>  <div id="max" style={{width:"20px",height:"20px",backgroundColor:COLORS[1]}}></div>
      Female</span>
  </div>
  </div>
  }
  
  </>
  )
}
