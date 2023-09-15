import { useEffect } from "react";

export default function Popup ({ isOpen, popupName, containerName, onClose, children }) {

  useEffect(() => {
    if (!isOpen) return;
    const handleCloseByEsc = e => e.key === 'Escape' && onClose();                
    document.addEventListener('keydown', handleCloseByEsc);               
    return () => document.removeEventListener('keydown', handleCloseByEsc) 
    }, [isOpen])

  return (
    <section className={`popup popup_type_${popupName} ${isOpen ? "popup_opened" : ""}`}
             onMouseDown={onClose}>
      <div className={`popup__container popup__container_type_${containerName}`}
           onMouseDown={(e) => e.stopPropagation()}>
        <button className="button button_type_close-popup"
                                       type="button"
                                       onClick={onClose} />
        {children}
      </div>
    </section>
  );
};


