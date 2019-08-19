const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const qs = require('querystring');
const secrets = require('./secrets');

const cid = secrets.CID;
const secret = secrets.CLIENT_SECRET;
const app = express();
app.use(cors());

app.get("/token", (req, res) => {
    res.json({ok: true});
})

app.get('/oauth/redirect',  (req, res) => {
    const code = req.query.code;
    const authorization = Buffer.from(`${cid}:${secret}`).toString('base64');
    console.log(code);

    axios({
        url: 'https://api.sandbox.paypal.com/v1/identity/openidconnect/tokenservice',
        method: 'post',
        headers: {
            'Authorization': `Basic ${authorization}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
            'grant_type': 'authorization_code',
            'code': code,
        })
  
    })
    .then((resolved) => {
        console.log('Hooray')
        const tokenResponse = resolved.data;
        console.log(tokenResponse);
        fs.writeFile("token.json", JSON.stringify(tokenResponse), (err) => {
            if (err) {
                console.log("An error occured");
                console.log(err)
            }

            const token = tokenResponse.access_token;
            res.redirect(`http://localhost:4200/setup?token=${token}`);
        })
    })
    .catch((error) => {
        console.log("Error")
    })
})



app.listen(8080, () => {
    console.log('listening on port 8080')
})