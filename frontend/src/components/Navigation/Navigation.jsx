// frontend/src/components/Navigation/Navigation.jsx
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul>
            <li>
                <NavLink to="/artpieces" >
                <img src="" alt="return to gallery home button" />
                </NavLink>
            </li>
            {sessionUser && (
                <li>
                    {/* {!!sessionUser && ( Button to open post-art-modal here )} */}
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    )
}