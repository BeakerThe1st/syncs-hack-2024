var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = 'http://localhost:6969/callback';

import queryString from 'query-string';

import Express from 'express';
const app = Express();

app.get("/", (req, res) => {
    return res.status(200).send("hello poopy");
});

app.listen(6969, () => {
    console.log(`Listening on 6969`);
})

app.get("/auth-url", (req, res) => {
  const scope = 'user-read-private user-read-email';
  const authParams = new URLSearchParams({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri: `http://localhost:/`,
    })

  res.redirect('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({req.query})
})

app.post("/get-code", (req, res) => {
  const accessToken = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: req.body.code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

  return accessToken;
})

console.log("hello world");