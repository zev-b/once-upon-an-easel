import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchArtThunk } from "../../store/art";
import './ArtCarousel.css';


export default function ArtCarousel() {
    const dispatch = useDispatch();
    const allArt = useSelector(state => state.art.allArt);

    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        dispatch(fetchArtThunk());
    }, [dispatch]);

    useEffect(() => {
        if (allArt && Object.keys(allArt).length > 0) {
            const interval = setInterval(() => {
                setCurrentIdx((prevIdx) => (prevIdx + 1) % Math.min(Object.keys(allArt).length, 15));
            }, 3000)
            return () => clearInterval(interval);
        }
    }, [allArt]);

    const displayArt = Object.values(allArt)?.slice(0, 15) || [];

    return (
        <div className="carousel-container">
            {displayArt.map((art, index) => (
                <img 
                    key={art.id}
                    src={art.imageId} 
                    alt="Art"
                    className={`carousel-image ${index === currentIdx ? 'active' : ''}`}
                />
            ))}
        </div>
    )
}