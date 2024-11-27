import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserArtThunk } from "../../store/art";
import { Link, useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalItem";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import PostEditArtModal from "../PostEditArtModal/PostEditArtModal";
import DeleteArtModal from "../DeleteArtModal/DeleteArtModal";
import './ManageArtPage.css';


export default function ManageArtPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);
    const allArt = useSelector(state => state.art.allArt);

    const [userArt, setUserArt] = useState([]);

    useEffect(() => {
        dispatch(fetchUserArtThunk()); 
    }, [dispatch]);
    
    useEffect(() => { 
        setUserArt(Object.values(allArt).filter(art => art.userId === user?.id));
    }, [allArt, user]);
    
    // const handleUpdateArt = (e, artId) => {
    //     e.stopPropagation();
    //     navigate(`/art-pieces/${artId}/edit`);
    // };

    return (
        <div className="manage-art-container">
      <h1>Manage Art</h1>
      {userArt && userArt.length > 0 ? (
        <div className="art-grid">

          {userArt.map((art) => (
            <div key={art.id} className="art-tile" onClick={() => navigate(`/art-pieces/${art.id}`)}>
              <img src={art.imageId} alt={art.title} />
              <div className="art-details">
                <div className='art-card-header'>

                <h3>{art.title}</h3>
              </div>
                <OpenModalButton
                    buttonText={<LiaEdit />}
                    className="edit-art-button"
                    modalComponent={<PostEditArtModal art={art} isEditing={true} />}
                />

                {/* <button className="update-art-button" onClick={(e) => handleUpdateArt(e, art.id)}><LiaEdit /></button> */}

                <OpenModalButton 
                    buttonText={<RiDeleteBin6Line />} 
                    className="delete-art-button" 
                    modalComponent={<DeleteArtModal artId={art.id}/>}
                />
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No art found. <OpenModalMenuItem
                                    itemText="Post to the gallery instead!"
                                    modalComponent={<PostEditArtModal />}
                                />
            </p>
        </div>
      )}
    </div>
    )
}