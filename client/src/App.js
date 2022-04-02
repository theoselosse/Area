import { BrowserRouter as Router, Routes, Route, NavLink  } from "react-router-dom";
import Authentification from "./components/Authentification/Authentification";
import { useEffect, useState } from "react";

import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import TopNavbar from './components/TopNavbar/TopNavbar';
import AuthService from "./utils";

function App() {
    const [currentUserInfo, setCurrentUserInfo] = useState(AuthService.getCurrentUserInfo());

    useEffect(() => {
        const userInfo = AuthService.getCurrentUserInfo();
        if (userInfo)
            setCurrentUserInfo(userInfo);
    }, []);

    return (
        <div>
            <Router>
                <TopNavbar currentUserInfo={currentUserInfo} setCurrentUserInfo={setCurrentUserInfo} />
                <Routes>
                    <Route path="/home" element={<Home userInfo={currentUserInfo} />} />
                    <Route path="/login" element={<Authentification userInfo={currentUserInfo} setUserInfo={setCurrentUserInfo} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
