const InfoTooltip = ({ isOpen, infoToolTipContent, onClose }) => {
  isOpen
    ? document.addEventListener('keydown', closeByEsc)
    : document.removeEventListener('keydown', closeByEsc);

  function closeByEsc(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  function closeByOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_info-tooltip ${isOpen ? 'popup_active' : ''}`}
      onClick={closeByOverlay}
    >
      <div className="popup__container popup__container_type_info-tooltip">
        <button className="popup__close" type="button" title="Закрыть" onClick={onClose}></button>
        <img
          className="popup__image-info-tooltip"
          src={infoToolTipContent.image}
          alt={infoToolTipContent.text}
        />
        <h2 className="popup__title-info-tooltip">{infoToolTipContent.text}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
