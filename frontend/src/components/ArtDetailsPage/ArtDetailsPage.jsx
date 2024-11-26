import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtDetails } from "../../store/art";
import "./ArtDetailsPage.css";

export default function ArtDetailsPage() {
    const { artId } = useParams();
    const dispatch = useDispatch();

    const art = useSelector(state => state.art.artDetails);
    const tags = useSelector(state => state.art.tags);
    const user = useSelector(state => state.session.user);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                await dispatch(fetchArtDetails(artId));
                // await dispatch(fetchTags(spotId));
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching art details or tags:", error);
                setLoaded(true);
            }
        };
        loadData();
    }, [dispatch, artId]);

    return loaded ? (
        <div className="art-details-page">
            <h2>{art.title}</h2>
            <div className="details-art-image-container">
                <img src={art.imageId} className="image-itself" alt="image of art" />
            </div>
            <div className="info-container">
            <div className="artist-name">
                Artist: {art.user.firstName} {art.user.lastName}
            </div>
            <div className="description">
                {art.description}
            </div>
            <div className="date-added">
            Added to gallery: {new Date(art.createdAt).toLocaleDateString('en-US')}
            </div>
            </div>
        </div>
    ) : <p>Loading art...</p>

}