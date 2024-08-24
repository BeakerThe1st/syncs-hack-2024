import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export const Auth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const code = searchParams.get("code");
    }, []);
    return <h1>Loading... {searchParams.get("code")}</h1>
}

