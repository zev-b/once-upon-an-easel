// frontend/src/components/Navigation/Navigation.jsx
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className="navbar">
            <li className="home-button">
                <NavLink to="/art-pieces" >
                <img src="" alt="return-to-gallery-home button" />
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