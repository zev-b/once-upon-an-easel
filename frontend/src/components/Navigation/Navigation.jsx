// frontend/src/components/Navigation/Navigation.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { clearArtState, fetchTagsThunk } from "../../store/art";
import { useEffect, useState } from "react";

export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const tags = useSelector(state => state.art.tags)
    const dispatch = useDispatch();
    const location = useLocation();

    const [isHome, setIsHome] = useState(false);

    
    const handleNav = () => {
        if (location.pathname !== "/art-pieces") dispatch(clearArtState())
    }
    
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
            <li>
                <ul className="tags-list">
                    { isHome && (<li>Filter by a tag:</li>)}
                    {isHome && (Object.values(tags)?.map((tag) => (
                        <li key={tag.id} className="tag">
                            {tag.name}
                        </li>
                    )))}
                </ul>
            </li>
        </ul>
    )
}