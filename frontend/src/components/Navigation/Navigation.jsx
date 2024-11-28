// frontend/src/components/Navigation/Navigation.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { clearArtState } from "../../store/art";

export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const handleNav = () => {
        if (location.pathname !== "/art-pieces") dispatch(clearArtState())
    }

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
        </ul>
    )
}