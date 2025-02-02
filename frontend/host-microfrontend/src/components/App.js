import React, { Suspense } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CurrentUserContext } from "users_microfrontend/CurrentUserContext";
import { checkToken } from "users_microfrontend/auth";
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";

const UserApp = React.lazy(() => import("users_microfrontend/UserApp"));

function App() {
    const [currentUser, setCurrentUser] = React.useState(null);

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    //В компоненты добавлены новые стейт-переменные: email — в компонент App
    const [email, setEmail] = React.useState("");

    const history = useHistory();

    const checkJwt = () => {
        const token = localStorage.getItem("jwt");
        if (token) {
            checkToken(token)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push("/");
                })
                .catch((err) => {
                    localStorage.removeItem("jwt");
                    console.log(err);
                });
        }
    }

    const handleAfterLogin = (event) => {
        setIsLoggedIn(true);
        setEmail(event.detail.email);
        history.push("/");
    }

    const handleFailLogin = () => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
    }

    const handleAfterRegister = () => {
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
        history.push("/signin");
    }

    const handleFailRegister = () => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
    }

    // при монтировании App описан эффект, проверяющий наличие токена и его валидности
    React.useEffect(() => {
        checkJwt();
    }, [history]);

    React.useEffect(() => {
        window.addEventListener("after-login", handleAfterLogin);
        return () => window.removeEventListener("after-login", handleAfterLogin)
    }, []);

    React.useEffect(() => {
        window.addEventListener("fail-login", handleFailLogin);
        return () => window.removeEventListener("fail-login", handleFailLogin)
    }, []);

    React.useEffect(() => {
        window.addEventListener("after-register", handleAfterRegister);
        return () => window.removeEventListener("after-register", handleAfterRegister)
    }, []);

    React.useEffect(() => {
        window.addEventListener("fail-register", handleFailRegister);
        return () => window.removeEventListener("fail-register", handleFailRegister)
    }, []);

    React.useEffect(() => {
        api
            .getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => console.log(err));
    }, []);

    function onSignOut() {
        // при вызове обработчика onSignOut происходит удаление jwt
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        // После успешного вызова обработчика onSignOut происходит редирект на /signin
        history.push("/signin");
    }

    function closeToolTip() {
        setIsInfoToolTipOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <div className="page__content">
                <Header email={email} onSignOut={onSignOut}/>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={Main}
                        loggedIn={isLoggedIn}
                    />
                    <Route path="/signup">
                        <Suspense fallback={"loading..."}>
                            <UserApp page="register"/>
                        </Suspense>
                    </Route>
                    <Route path="/signin">
                        <Suspense fallback={"loading..."}>
                            <UserApp page="login"/>
                        </Suspense>
                    </Route>
                </Switch>
                <Footer/>
                <InfoTooltip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeToolTip}
                    status={tooltipStatus}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;