// frontend/src/components/Navigation/OpenModalMenuItem.jsx
import { useModal } from '../../context/Modal';
import './Navigation.css';

function OpenModalMenuItem({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    className
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = (e) => {
        e.stopPropagation();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onItemClick === "function") onItemClick();
    };

    return (
        <li onClick={onClick} className={className}>{itemText}</li>
    );
}
  
  export default OpenModalMenuItem;