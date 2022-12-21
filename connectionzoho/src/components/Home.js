import React, { useState, useEffect } from "react";
// var axios = require("axios");
import axios from 'axios';

function Home() {
    const accessTokenApi='http://localhost:8080/zoho';

  //const [accessToken, SetAccessToken] = useState([]);
  const [data, setData] = useState([]);
 
  

  const inventoryitem = async (url) => {

      try {
        //const res= await fetch(url,{mode: 'no-cors'})
        const res= await fetch(url)
        const data2=await res.json()
        console.log(data2)
        setData(data2.myData);
      } catch (error) {
        console.log(error);
      }  
  };
  console.log(data)
  useEffect(() => {
    inventoryitem(accessTokenApi);
  }, []);
  return (
    <div>
      <h1>All Items </h1>
      <ol>
        {data.map((item) => {
          return <li key={item.item_id}>{item.name} Created Time {item.created_time}</li>;
        })}
      </ol>
    </div>
  );
}

export default Home;
