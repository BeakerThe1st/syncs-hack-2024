import './env';

import Express, {json} from 'express';
import cors from 'cors';

const app = Express();

app.use(cors());
app.use(json());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

app.get("/", (req, res) => {
    return res.status(200).send("hello poopy");
});

app.listen(6969, () => {
    console.log(`Listening on 6969`);
})

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

  res.status(200).send({access_token: json.access_token, user_id: newUserId()});
})

var currentUserId: number = -1;
const newUserId = ()  => {
  currentUserId += 1;
  return currentUserId;
}

var currentMatchId: number = -1;
const newMatchId = (user_id: string)  => {
  if (user_id === 'B') currentMatchId += 1;
  return `${currentMatchId}${user_id}`;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(
    (resolve) => setTimeout(resolve, ms));
}

var userCount = 0
var userSongPair: string[] = [];

// 205 no one ready
// 200 ready for someone
// return your id, their id, match_id
app.post("/match", (req, res) => {
    console.dir(req.body);
  if (userCount === 1) {
    // THIS IS USER A.
    userSongPair[0] = req.body.song_id;
    res.status(200).send({match_id: newMatchId('A')});
  }
  else if (userCount === 0) {  
    // THIS IS USER B.
    userCount += 1;
    sleep(5000);
    if (userCount === 1) {
      userSongPair[1] = req.body.song_id;
      res.status(200).send({match_id: newMatchId('B')});
      userCount = 0;
    }
    res.status(205).send();
  }
})

app.get("/match/:id", (req, res) => {
    userSongPair[0] = "0JP9xo3adEtGSdUEISiszL";
    userSongPair[1] = "0JP9xo3adEtGSdUEISiszL";
  if ((req.params.id as string).slice(-1) === 'A') res.status(200).send({song_id: userSongPair[1]});
  else if ((req.params.id as string).slice(-1) === 'B') res.status(200).send({song_id: userSongPair[0]});
  else throw new Error("Match IDs are fucked up.");
});

console.log("hello world");