import { useState } from "react"
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { deleteArtThunk } from "../../store/spots";
import './DeleteArtModal.css';

export default function DeleteArtModal({ artId }) {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        try {
            // await dispatch(deleteArtThunk(artId))
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="delete-modal">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        {error && (<p>{error}</p>)}
        <p>Are you sure you want to remove this art from the gallery?</p>
        <div className="modal-buttons">
          <button className="delete-button-yes" onClick={handleDelete}>
            Yes (Delete Art)
          </button>
          <button className="cancel-button" onClick={closeModal}>
            No (Keep Art)
          </button>
        </div>
      </div>
    </div>
    )
}