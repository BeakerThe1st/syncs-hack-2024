import './env';

import Express from 'express';
import cors from 'cors';

const app = Express();

app.use(cors());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

app.get("/", (req, res) => {
    return res.status(200).send("hello poopy");
});

app.listen(6969, () => {
    console.log(`Listening on 6969`);
})

/*const getServerToken = async (): string => {
    return await fetch('', {
        method: 'POST',
        headers: "Content-Type: application/x-www-form-urlencoded",
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    });
}*/

app.get("/token/", async (req, res) => {


  const body = new URLSearchParams({
      code: req.query.code as string,
      redirect_uri: `http://localhost:1337/auth`,
      grant_type: 'authorization_code'
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body,
      headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
  });

  const json = await response.json();

  console.dir(json);

  res.status(200).send({access_token: json.access_token});
})

console.log("hello world");