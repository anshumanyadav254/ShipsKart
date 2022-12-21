const express = require('express')
var axios = require('axios');
var cors = require('cors');
const app = express()
const PORT = 8080
var token;

app.use(cors())

const tokenGeneration = () => {
  var config = {
    method: 'post',
    url: 'https://accounts.zoho.in/oauth/v2/token?client_id=1000.TW3YMYMR87KKB2EXUXGZ5LIGYLD9IG&client_secret=65a6ad3940f9b84ec465524a2650c7816f48a75074&redirect_uri=https://google.com&grant_type=refresh_token&refresh_token=1000.cd5fe2f81a53ee2d0f478b45584b5cf4.94213d605abc97e5b1e8dac17ba1b2fb',
    headers: { 
      'Cookie': '6e73717622=4440853cd702ab2a51402c119608ee85; _zcsr_tmp=2ade82ac-8d7f-402b-8e1e-b03306a49f99; iamcsr=2ade82ac-8d7f-402b-8e1e-b03306a49f99'
    }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    token = response.data.access_token
    console.log(token);
  })
  .catch(function (error) {
    console.log(error);
  });
}


tokenGeneration()
setInterval(() => {
  tokenGeneration()
}, 3500000);
app.get('/zoho', (req, res) => {
  let resp;
  var config = {
    method: 'get',
    url: 'https://inventory.zoho.in/api/v1/items',
    headers: { 
      'Authorization': 'Bearer '+token+'', 
      'Cookie': 'BuildCookie_60018541195=1; 3241fad02e=db2744864c62d6371b6f16a93ff5569d; JSESSIONID=9D8AB0FE566A67365CD94713DF1738A6; _zcsr_tmp=b1ea8a89-b9c8-477e-86e5-60bec8a1169d; zomcscook=b1ea8a89-b9c8-477e-86e5-60bec8a1169d'
    }
  };
  
  axios(config)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    resp = response.data
    //res.send(resp.items)
    //res.send(resp);
    let dt = {};
    dt["myData"] = resp.items;
    res.send(dt);
  })
  .catch(function (error) {
    console.log(error);
  });
  // res.send(resp)
})

app.listen(PORT, () => {
  console.log("listening on port"+PORT)
} )



