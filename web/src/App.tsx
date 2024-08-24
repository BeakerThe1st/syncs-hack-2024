import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const App = () => {
    const authParams = new URLSearchParams({
        response_type: 'code',
        client_id: "ae4bc472d1c44cacb538ccd67dbaa7a0",
        scope: "streaming user-read-email user-read-private user-modify-playback-state",
        redirect_uri: `http://localhost:1337/auth`,
    })
    const [accessToken, setAccessToken] = useState<string | undefined | null>();

    const [songId, setSongId] = useState("");

    const [awaitingMatch, setAwaitingMatch] = useState(false);

    const navigate = useNavigate();

    const handleSongIdChange = (e: FormEvent<HTMLInputElement>) => {
        setSongId(e.currentTarget.value);
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        requestMatch();
        setAwaitingMatch(true);
    }

    const requestMatch = () => {
        console.log(`songId is ${songId}`);
        fetch("http://localhost:6969/match", {method: "POST", body: JSON.stringify({song_id: songId}), headers: {
            'content-type': 'application/json',
            }}).then((res) => {
            if (res.status === 205) {
                console.log("got 205, sending again");
                requestMatch();
            } else if (res.status === 200) {
                res.json().then((json) => {
                    console.log(`Go to match ${json.match_id}`);
                    navigate(`/player/${json.match_id}`,);
                })
            }
        });
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        if (!storedToken) {
            setAccessToken(null);
        } else {
            setAccessToken(storedToken);
        }
    }, []);
    if (accessToken === undefined) {
        return <h1>Loading...</h1>
    } else if (accessToken === null) {
        return <a href={`https://accounts.spotify.com/authorize?${authParams.toString()}`}>Login</a>
    } else if (awaitingMatch) {
        return <h1>Awaiting match :)</h1>
    } else {
        return <form onSubmit={handleSubmit}>
            <label>Song ID</label>
            <input type="text" value={songId} onChange={handleSongIdChange} />
            <label>Enter</label>
            <input type="submit"/>
        </form>
    }
}

export default App
