import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const Player = () => {
    /*const [matchData, setMatchData] = useState<any>();
    const {match} = useParams();
    useEffect(() => {
        setMatchData({
            song_id: "19RybK6XDbAVpcdxSbZL1o"
        })
        fetch(`http://localhost:6969/match/${match}`).then((res) => res.json()).then((json) => setMatchData(json));
    }, []);*/

    const matchData = {
        song_id: "19RybK6XDbAVpcdxSbZL1o";
    }
    if (matchData === undefined) {
        return <h1>Loading match data...</h1>
    }
    return <ActualPlayer matchData={matchData} />
}

interface ActualPlayerProps {
    matchData: any
}
const ActualPlayer = (props: ActualPlayerProps) => {
    const [player, setPlayer] = useState<any>(undefined);
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
                name: 'playback',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setPlayerReady(true);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });


            player.connect();

        };
    }, [props]);

    if (!playerReady) {
        return <h1>Loading Player...</h1>
    }

    return <>
        <button onClick={() => player.togglePlay()}>play/pause</button>
        <h1>playing??</h1>
    </>
}