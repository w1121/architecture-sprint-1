import React from 'react';
import { CurrentUserContext } from "users_microfrontend/CurrentUserContext";
import Places from "photos_microfrontend/Places";
import Profile from "users_microfrontend/Profile";

function Main() {
    const { currentUser } = React.useContext(CurrentUserContext);

    const handleAddPlace = () => {
        dispatchEvent(new CustomEvent("add-place-popup"));
    };

    return (currentUser
            ?
            <main className="content">
                <Profile className="page__section">
                    <button className="profile__add-button" type="button" onClick={handleAddPlace}></button>
                </Profile>
                <Places currentUser={currentUser} className="page__section"/>
            </main>
            : ''
    );
}

export default Main;