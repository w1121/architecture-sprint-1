import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/api";

import '../blocks/profile/profile.css'



function Profile({ className, children }) {
    const { currentUser, setCurrentUser}  = React.useContext(CurrentUserContext);

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditProfileClose() {
        setIsEditProfilePopupOpen(false);
    }

    function handleUpdateUser(userUpdate) {
        api
            .setUserInfo(userUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                handleEditProfileClose();
            })
            .catch((err) => console.log(err));
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleUpdateAvatarClose() {
        setIsEditAvatarPopupOpen(false);
    }

    function handleUpdateAvatar(avatarUpdate) {
        api
            .setUserAvatar(avatarUpdate)
            .then((newUserData) => {
                setCurrentUser(newUserData);
                handleUpdateAvatarClose();
            })
            .catch((err) => console.log(err));
    }

    return [
        <section className={`profile ${className}`} key="profile">
            <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            {children}
        </section>,
        <EditProfilePopup
            key="editProfile"
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={handleEditProfileClose}
        />,
        <EditAvatarPopup
            key="editPopup"
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={handleUpdateAvatarClose}
        />
    ];
}

export default Profile;