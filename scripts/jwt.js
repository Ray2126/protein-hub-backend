require('dotenv').config()
const axios = require('axios');

axios.request({
  url: process.env.OAUTH_TOKEN_URL,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  data: {
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET,
    audience: process.env.AUDIENCE,
    'grant_type': 'client_credentials',
  },
}).then((res) => { console.log(res.data.access_token) });