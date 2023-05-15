export default function ImagePopup({isOpen, card, onClose}) {

  function closeByOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div 
      className={`popup popup_type_image ${isOpen ? 'popup_active': ''}`}
      onClick={closeByOverlay}
      >
      <div className="popup__container">
        <button 
          className="popup__close" 
          type="button" 
          title="Закрыть"
          onClick={onClose}
          >
          </button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h2 className="popup__title">{card?.name}</h2>
      </div>
    </div>
  )
}