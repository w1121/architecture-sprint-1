import React from 'react';
import Card from './Card';

import '../blocks/places/places.css'
import '../blocks/popup/popup.css'
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";

function Places({ currentUser, className }) {
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    React.useEffect(() => {
        api
            .getCardList()
            .then((cardData) => {
                setCards(cardData);
            })
            .catch((err) => console.log(err));
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api
            .removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handlerCloseImagePopup() {
        setSelectedCard(null);
    }

    function handleAddPlaceClose() {
        setIsAddPlacePopupOpen(false);
    }

    function handleAddPlaceSubmit(newCard) {
        api
            .addCard(newCard)
            .then((newCardFull) => {
                setCards([newCardFull, ...cards]);
                handleAddPlaceClose();
            })
            .catch((err) => console.log(err));
    }
    function handleAddPlaceOpen() {
        setIsAddPlacePopupOpen(true);
    }


    React.useEffect(() => {
        window.addEventListener("add-place-popup", handleAddPlaceOpen);
        return () => window.removeEventListener("add-place-popup", handleAddPlaceOpen)
    }, []);

    return (
        <section className={`places ${className}`}>
            <ul className="places__list">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        currentUser={currentUser}
                        card={card}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                ))}
            </ul>
            <ImagePopup card={selectedCard} onClose={handlerCloseImagePopup} />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onAddPlace={handleAddPlaceSubmit}
                onClose={handleAddPlaceClose}
            />
        </section>
    );
}

export default Places;