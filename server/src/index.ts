var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirect_uri = 'http://localhost:6969/callback';

import Express from 'express';

const app = Express();

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
  const code = ((req.params as any).code as string);
  const response = await fetch("http://accounts.spotify.com/api/token", {
      body: JSON.stringify({
          code,
          redirect_uri,
          grant_type: 'authorization_code'
      }),
      headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      }
  });
  const json = await response.json();

  res.status(200).send({accessToken: json.accessToken});
})

console.log("hello world");