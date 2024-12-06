// frontend/src/components/Navigation/Navigation.jsx
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { clearArtState, fetchArtThunk, fetchTagsThunk, setActiveFilter } from "../../store/art";
import { useEffect, useState } from "react";

export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const tags = useSelector(state => state.art.tags)
    const activeFilter = useSelector(state => state.art.activeFilter);
    const dispatch = useDispatch();
    const location = useLocation();

    const [isHome, setIsHome] = useState(false);

    
    const handleNav = () => {
        if (location.pathname !== "/art-pieces") dispatch(clearArtState())
    }

    const handleTagClick = (tagId, e) => {
        if (e.currentTarget.classList.contains("filtered")) {
            e.currentTarget.classList.remove("filtered")
            // dispatch(setActiveFilter(tagId));
            clearFilter();
        } else {
            document.querySelectorAll(".tag.filtered").forEach((el) => el.classList.remove("filtered"));
            e.currentTarget.classList.add("filtered")
            dispatch(setActiveFilter(tagId));
            dispatch(fetchArtThunk({ tagId }));
        }
    };

    const clearFilter = () => {
        document.querySelectorAll(".tag.filtered").forEach((el) => el.classList.remove("filtered"));
        dispatch(setActiveFilter(null)); // reset filter
        dispatch(fetchArtThunk()); // Fetch all art
    };
    
    useEffect(() => {
        dispatch(fetchTagsThunk())
        if (location.pathname === "/art-pieces") {
            setIsHome(true);
        } else {
            setIsHome(false)
        }
    }, [dispatch, location])

    return (
        <ul className="navbar">
            <div className="top-of-nav-bar">
            <li className="home-button">
                <NavLink 
                    to="/art-pieces"
                    onClick={handleNav}
                    className="nav-link" >
                Once Upon an Easel
                </NavLink>
            </li>
            {sessionUser && (
                <li className="navbar-item">
                    <ProfileButton user={sessionUser} />
                </li>
            )}
            </div>
                <div className="filter-situation">
                    { isHome && (<span>Filter by a tag:</span>)}
                    {isHome && activeFilter && (
                        <button onClick={clearFilter} className="clear-filter-btn">Clear Filter</button>
                    )}
                    <ul className="tags-list">
                        {isHome && (Object.values(tags)?.map((tag) => (
                            <li key={tag.id} className="tag" onClick={(e) => handleTagClick(tag.id, e)}>
                                {tag.name}
                            </li>
                        )))}
                    </ul>
                </div>
        </ul>
    )
}