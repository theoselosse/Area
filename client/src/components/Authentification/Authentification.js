import { useState } from "react";
import axios from "axios";
import AuthService from "../../utils";
import styles from './Authentification.module.css'
import Dashboard from "../Dashboard/Dashboard";

export default function Authentification({userInfo, setUserInfo}) {
    // Registration form vars
    const [usernameReg, setUsernameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    // Login form vars
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState()
    const [loginStatus, setLoginStatus] = useState("");

    // Registration handler
    const register = () => { axios.post("http://localhost:8080/register", {
        username: usernameReg,
        email: emailReg,
        password: passwordReg
    }).then((res) => {
        console.log(res);
    });
};

    // Login handler
    const login = () => { axios.post("http://localhost:8080/login", {
        email: email,
        password: password
    }).then((res) => {
        console.log(res);
        if (res.data && res.data.message)
            setLoginStatus(res.data.message);

        if (res.data && res.data.token) {
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            setLoginStatus(res.data.user.username);
            setUserInfo(AuthService.getCurrentUserInfo());
            window.location.href = "/home";
        }
    });
};

    return (
        <div className={styles.home_column}>
            <div className={styles.home_block_col}>
                <div className={styles.form_state}>
                    <p class="alert alert-secondary">{loginStatus}
                        {user ? user.username : "You are disconnected. You have to register or login if you already have an account."}
                    </p>
                </div>
            </div>
            <div className={styles.home_block_col}>
                <div className={styles.home_row}>
                    <div className={styles.home_block}>
                        <div className="login" className={styles.form_part}>
                            <div className={styles.center}> 
                                <div class="card text-white bg-secondary mb-3">
                                    <div class="card-header">
                                        <h2 className={styles.header_title}>Login :</h2>
                                    </div>
                                    <input className={styles.form_elem} type="text" placeholder="Email" onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}/>
                                    <br/>
                                    <input className={styles.form_elem} type="password" placeholder="Password" onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}/>
                                    <br/>
                                    <button type="button" class="btn btn-info" onClick={login}>Login</button>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="registration" className={styles.form_part}>
                            <div className={styles.center}>
                                <div class="card text-white bg-secondary mb-3">
                                    <div class="card-header">
                                        <h2 className={styles.header_title}>Register:</h2>
                                    </div>
                                    <input className={styles.form_elem} type="text" placeholder="Username" onChange={(e) => {
                                        setUsernameReg(e.target.value)
                                    }}/>
                                    <br/>
                                    <input className={styles.form_elem} type="text" placeholder="Email" onChange={(e) => {
                                        setEmailReg(e.target.value)
                                    }}/>
                                    <br/>
                                    <input className={styles.form_elem} type="text" placeholder="Password" onChange={(e) => {
                                        setPasswordReg(e.target.value)
                                    }}/>
                                    <br/>
                                    <button type="button" class="btn btn-info" onClick={register}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.home_block}>
                        <div className="github" className={styles.form_part}>
                            <div className={styles.right}>
                                <div class="card bg-secondary mb-3">
                                    <div class="card-header">
                                        <Dashboard/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}