import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchArtThunk, fetchTagsThunk } from "../../store/art";
import { useEffect } from "react";
import './GalleryHome.css'

export default function GalleryHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector(state => state.session.user);
    const allArt = useSelector(state => state.art.allArt);
    const tags = useSelector(state => state.art.tags)


    useEffect(() => {
        dispatch(fetchArtThunk())
        dispatch(fetchTagsThunk())
    }, [dispatch]);

    const handleTileClick = (artId) => {
        navigate(`/art-pieces/${artId}`);
    };
 
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
                        <span> Title: {art.title}</span>
                        <span>Artist: {art.user.firstName} {art.user.lastName}</span>
                             <div className="art-tags">
                                 {Object.values(tags).filter((tag) => art.tags.includes(tag.id)).map((tag) => (
                                    <div key={tag.id} >
                                        {tag.name}
                                    </div>
                                 ))
                                 }
                             </div>
                         </div>
                    </div>
                </div>
            ))}
        </div>
    )
}