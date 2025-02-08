import React from "react";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth.js";

function App({ page }) {
    function onLogin({ email, password }) {
        auth
            .login(email, password)
            .then((res) => {
                dispatchEvent(new CustomEvent("after-login", {
                    detail: { email }
                }));
            })
            .catch((err) => {
                dispatchEvent(new CustomEvent("fail-login"));
            });
    }

    function onRegister({ email, password }) {
        auth
            .register(email, password)
            .then((res) => {
                dispatchEvent(new CustomEvent("after-register"));
            })
            .catch((err) => {
                dispatchEvent(new CustomEvent("fail-register"));
            });
    }

    const components = []

    if (page === 'login') {
        components.push(<Login onLogin={onLogin} key="login"/>);
    } else if (page === 'register') {
        components.push(<Register onRegister={onRegister}/>);
    }

    return components;
}

export default App;