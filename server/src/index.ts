import './env';
import mongoose from 'mongoose';

import Express, {json} from 'express';
import cors from 'cors';

const app = Express();

import Chat from './DB/ChatSchema';

const connectionString: string = process.env.MONGO_CONNECTION_STRING || "";
mongoose.connect(connectionString);

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

  res.status(200).send({access_token: json.access_token,  user_id: newUserId() });
})

var currentUserId: number = -1;
const newUserId = ()  => {
  currentUserId += 1;
  return currentUserId;
}

var currentMatchId: number = 0;
const newMatchId = ()  => {
  return `${currentMatchId + 1}`;
}

async function sleep(ms: number): Promise<void> {
  return new Promise(
    (resolve) => setTimeout(resolve, ms));
}

var userCount = 0
var userSongPair: string[] = [];

const userQueue = [];

interface Match {
    song_id_a?: string;
    song_id_b?: string;
}

const matches = new Map<string, Match>();


// 205 no one ready
// 200 ready for someone
// return your id, their id, match_id
app.post("/match", async (req, res) => {
    console.dir(req.body);
    console.log(`received match request with song id: ${req.body.song_id}`);
    for (const [id, match] of matches) {
        if (!match.song_id_b) {
            match.song_id_b = req.body.song_id;
            console.log(`found open match ${id}`);
            return res.status(200).send({match_id: `${id}A`});
        }
    }

    //Did not find an open match, creating one
    const match_id = newMatchId();

    console.log(`creating open match ${match_id}`);
    matches.set(match_id, {song_id_a: req.body.song_id});

    console.log('eepy');
    let tries = 0;
    while (tries < 10) {
        await sleep(1000);
        if (matches.get(match_id)?.song_id_b) {
            //There is a match
            console.log(`match ${match_id} complete`);
            await Chat.create({
                ChatId: match_id,
                SongIDa: matches.get(match_id)?.song_id_a,
                SongIDb: req.body.song_id
            });
            matches.delete(match_id); // remove temp structure for finding matches, reference DB for more.
            return res.status(200).json({ match_id: `${match_id}B`});
        }
        tries++;
    }
    //Did not get a match in time
    matches.delete(match_id);
    console.log(`deleting open match ${match_id}`);
    return res.status(205);
})

app.get("/match/:id", async (req, res) => {
    const pairDesignator = req.params.id.slice(-1);
    const actualId = req.params.id.substring(0, req.params.id.length - 1);
    console.log(`actual id: ${actualId}`);
    console.log(`pair designator: ${pairDesignator}`);
    const match = await Chat.find({ChatID: actualId}).lean;
    if (match === null) {
        throw new Error("Invalid match");
    }
    let song_id;
    if (pairDesignator === "A") {
        song_id = match.SongIDb;
    } else {
        song_id = match.SongIDa;
    }
    res.status(200).send({song_id});
});

console.log("hello world");