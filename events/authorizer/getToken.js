require('dotenv').config()
const axios = require('axios');

axios.request({
  url: 'https://dev-jd41cus6.au.auth0.com/oauth/token',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  data: {
    'client_id': 'q3jhMXV3v6M6NWBShcIap82s183FWT0q',
    'client_secret': process.env.CLIENT_SECRET,
    audience: 'https://90yd15q08j.execute-api.ap-southeast-2.amazonaws.com/Prod/',
    'grant_type': 'client_credentials',
  },
}).then((res) => { console.log(res.data.access_token) });


