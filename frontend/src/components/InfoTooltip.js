import logoSuccess from '../images/logo-success.svg'
import logoFail from '../images/logo-fail.svg'
import Popup from './Popup';

export default function InfoTooltip({ isOpen, onClose, isRegisterOk }) {

  const logo = isRegisterOk ? logoSuccess : logoFail;

  const title = isRegisterOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! \n Попробуйте ещё раз.";
  
  return (
    <Popup
    isOpen={isOpen}
    popupName="info-tooltip"
    containerName="info-tooltip"
    onClose={onClose}
  >
        <div className="info-tooltip">
          <img
          className="popup__logo"
          src={logo}
          alt="Логотип"
          />
          <h2 className="info-tooltip__title">{title}</h2>
        </div>
    </Popup> 
  )
} 