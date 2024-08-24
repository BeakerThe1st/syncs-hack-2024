import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export const Auth = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const navigate = useNavigate();
    if (!code) {
        return <Navigate to={"/"} replace />
    }
    useEffect(() => {
        const params = new URLSearchParams({code});
        fetch(`http://localhost:6969/token?${params.toString()}`, {method: "GET"}).then((res) => res.json()).then((json) => {
            console.dir(json);
            if (!json.access_token) {
                throw new Error("access token not provided");
            }
            localStorage.setItem("access_token", json.access_token)
            alert(`Access token is now: ${localStorage.getItem("access_token")}`)
            navigate({pathname: "/"});
        })
    }, [code]);
    return <h1>Loading auth...</h1>
}