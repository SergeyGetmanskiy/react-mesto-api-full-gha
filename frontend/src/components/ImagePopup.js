import Popup from "./Popup"

export default function ImagePopup({card, isOpen, onClose}) {
  return (
    <Popup
      isOpen={isOpen}
      popupName="image-popup"
      containerName="image-popup"
      onClose={onClose}
    >
      <img className="popup__image" src={card.link} alt={card.name} />
      <p className="popup__caption">{card.name}</p>
    </Popup>
  ) 
}