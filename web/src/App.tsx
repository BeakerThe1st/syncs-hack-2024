import {useEffect, useState} from "react";

export const App = () => {
    const authParams = new URLSearchParams({
        response_type: 'code',
        client_id: "ae4bc472d1c44cacb538ccd67dbaa7a0",
        scope: "playlist-read-collaborative",
        redirect_uri: `http://localhost:1337/auth`,
    })
    const [accessToken, setAccessToken] = useState<string | undefined | null>();
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        setAccessToken(storedToken);
    }, []);
    if (accessToken === undefined) {
        return <h1>Loading...</h1>
    } else if (accessToken === null) {
        return <a href={`https://accounts.spotify.com/authorize?${authParams.toString()}`}>Login</a>
    } else {
        return <button>Select a song</button>
    }
}

export default App
