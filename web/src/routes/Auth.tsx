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
        fetch(`http://localhost:6969/${params.toString()}`).then((res) => res.json()).then((json) => {
            localStorage.setItem("accessToken", json.accessToken)
            navigate({pathname: "/"});
        })
    }, []);
    return <h1>Loading auth...</h1>
}

