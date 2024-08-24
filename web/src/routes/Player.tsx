import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

interface MatchData {
    song_id: string;
}
export const Player = () => {
    const [matchData, setMatchData] = useState<MatchData>();
    const {match} = useParams();
    useEffect(() => {
        fetch(`http://localhost:6969/match/${match}`).then((res) => res.json()).then((json) => setMatchData(json));
    }, []);

    console.log(matchData);

    if (matchData === undefined) {
        return <h1>Loading match data...</h1>
    }

    console.log("match data");
    console.dir(matchData);
    return <ActualPlayer matchData={matchData} />
}

interface ActualPlayerProps {
    matchData: any
}
const ActualPlayer = (props: ActualPlayerProps) => {
    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
    const [deviceId, setDeviceId] = useState<string | undefined>();
    const [playerReady, setPlayerReady] = useState(false);
    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const accessToken = localStorage.getItem("access_token") ?? "";
            console.log(`access token is ${accessToken}`);
            const player = new window.Spotify.Player({
                name: 'SpotChat',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            player.on("initialization_error", () => {
                console.log("init error")
            })
            player.on("account_error", () => {
                console.log("acc error")
            })

            player.on("authentication_error", () => {
                console.log("auth error")
            })

            player.on("playback_error", (err) => {
                console.dir(err);
            })

            player.on("autoplay_failed", () => {
                console.log("autoplay failed");
            })

            player.on("player_state_changed", () => {
                console.log("player state changed");
            })

            player.addListener('ready', ({ device_id }) => {
                setDeviceId(device_id);
                setPlayerReady(true);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            setPlayer(player);


            player.connect().then(() => console.log("connected"));

        };
    }, []);

    if (!playerReady || !player || !deviceId) {
        return <h1>Loading Player...</h1>
    }

    return <>
        <button onClick={() => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: "PUT",
                body: JSON.stringify({uris: [`spotify:track:${props.matchData.song_id}`]}),
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }).catch((e) => {
                console.dir(e);
            })
        }}>Play</button>
        <h1>playing??</h1>
    </>
}