import {FormEvent, useEffect, useState} from "react";

export const App = () => {
    const authParams = new URLSearchParams({
        response_type: 'code',
        client_id: "ae4bc472d1c44cacb538ccd67dbaa7a0",
        scope: "playlist-read-collaborative",
        redirect_uri: `http://localhost:1337/auth`,
    })
    const [accessToken, setAccessToken] = useState<string | undefined | null>();

    const [songId, setSongId] = useState("");

    const [awaitingMatch, setAwaitingMatch] = useState(false);

    const handleSongIdChange = (e: FormEvent<HTMLInputElement>) => {
        setSongId(e.currentTarget.value);
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Received song id ${songId}`);
        requestMatch();
        setAwaitingMatch(true);
    }

    const requestMatch = () => {
        fetch("http://localhost:6969/match", {method: "POST", body: JSON.stringify({song_id: songId})}).then((res) => {
            if (res.status === 205) {
                console.log("got 205, sending again");
                requestMatch();
            } else if (res.status === 200) {
                res.json().then((json) => {
                    alert(`Play ${json.song_id}`);
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
