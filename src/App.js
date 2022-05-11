import { useEffect, useState } from "react";
import "./App.css";
import { Main } from "./components/Main";
import logo from './assets/logo.png'

function App() {
  const url1 = "https://kyupid-api.vercel.app/api/users";
  const url2 = "https://kyupid-api.vercel.app/api/areas";

  const [sameAreaUsers, setSameAreaUsers] = useState({});
  const [areasObj, setAreasObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const usersList = await fetch(url1).then((res) => res.json());
        const areaList = await fetch(url2).then((res) => res.json());
        compute(usersList.users, areaList.features);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  function compute(users, areas) {
    users.forEach((user) => {
      areas.forEach((area) => {
        if (user.area_id === area.properties.area_id) {
          // sameAreaUsers[area.properties.area_id].total_pros =0;

          if (sameAreaUsers[area.properties.area_id]) {
            //  console.log( sameAreaUsers[area.properties.area_id])
            let existingUsers = sameAreaUsers[area.properties.area_id].userlist;
            sameAreaUsers[area.properties.area_id].userlist = [
              ...existingUsers,
              user,
            ];
            areasObj[area.properties.area_id] = area.properties.name;
            //  sameAreaUsers[area.properties.area_id].male_count = existingMaleCount +1;
          } else {
            let obj = {};
            obj.userlist = [user];
            sameAreaUsers[area.properties.area_id] = obj;
            areasObj[area.properties.area_id] = area.properties.name;
            console.log("Not present");
          }

          if (user.gender === "M") {
            let existingMaleCount = sameAreaUsers[area.properties.area_id]
              .male_count
              ? sameAreaUsers[area.properties.area_id].male_count
              : 0;

            sameAreaUsers[area.properties.area_id].male_count =
              existingMaleCount + 1;
          } else if (user.gender === "F") {
            let existingFemaleCount = sameAreaUsers[area.properties.area_id]
              .female_count
              ? sameAreaUsers[area.properties.area_id].female_count
              : 0;
            sameAreaUsers[area.properties.area_id].female_count =
              existingFemaleCount + 1;
          }

          if (user.is_pro_user === true) {
            sameAreaUsers[area.properties.area_id].total_pros = sameAreaUsers[
              area.properties.area_id
            ].total_pros
              ? sameAreaUsers[area.properties.area_id].total_pros + 1
              : 1;
          }
        }
      });
    });
  }

  return (
    <div className="App">
      <h1><img src={logo} alt="brand logo"></img> Locale AI</h1>
      {isLoading?<span>Loading...</span> : <Main sameAreaUsers={sameAreaUsers} areasObj={areasObj} />}
    </div>
  );
}

export default App;
