import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import GithubPage from "./GithubPage/GithubPage.js";

function Dashboard() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get(
            "access_token"
    );

    axios
        .get("https://api.github.com/user", {
            headers: {
                Authorization: "token " + token,
            },
        })
        .then((res) => {
            setUser(res.data);
            setLoggedIn(true);
        })
        .catch((error) => {
            console.log("error " + error);
        });
    }, []);
    return (
        <div className="App text-center container-fluid">
            {!loggedIn ? (
                <>
                <img
                    className="mb-4"
                    src="https://logos-marques.com/wp-content/uploads/2021/03/GitHub-Logo-500x283.png"
                    width="300"
                ></img>
                <h1 className="h3 mb-3 font-weight-normal">Sign in with GitHub</h1>
                {/* Github App client_id  */}
                <Button
                    type="primary"
                    className="btn"
                    size="lg"
                    href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:8080/oauth/redirect`}
                >
                    Sign in
                </Button>
                </>
            ) : (
                <GithubPage user={user} />
            )}
        </div>
    );
}

export default Dashboard;
