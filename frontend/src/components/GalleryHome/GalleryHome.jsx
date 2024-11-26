import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function GalleryHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const allArt = useSelector(state => state.art.allArt);

    return (
        <div className="art-list">
            {Object.values(allArt).map((art) => (
                <div 
                key={art.id}
                className="art-tile"
                onClick={() => handleTileClick(art.id)}
                title={art.title}
                >
                <img src={art.imageId}alt={`${art.title} -Image`} className="art-image" /> 
                <div className="art-info">
                     <div className="art-details-info">
                        <span>Artist: {art.user.firstName} {art.user.lastName}</span>
                             <div className="art-tags">
                                 <div>Tags here</div>
                             </div>
                         </div>
                    </div>
                </div>
            ))}
        </div>
    )
}