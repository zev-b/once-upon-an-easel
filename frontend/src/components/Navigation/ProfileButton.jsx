// frontend/src/components/Navigation/ProfileButton.jsx
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { PiUserListLight } from "react-icons/pi";
import PostEditArtModal from "../PostEditArtModal/PostEditArtModal";
import './ProfileButton.css';
import OpenModalButton from "../OpenModalButton/OpenModalButton";

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        if (!showMenu) return;
        
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        navigate("/")
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
        <button onClick={toggleMenu} className="p-icon">
        <PiUserListLight />
        </button>
        <ul className={ulClassName} ref={ulRef}>
            <>
              <li>Hello, {user.username}</li>
              <li>
              <OpenModalButton
                buttonText="Post to Gallery"
                onItemClick={closeMenu}
                modalComponent={<PostEditArtModal />}
              />
              </li>
              <li>
                <button onClick={() => {
                        closeMenu()
                        navigate('/art-pieces/manage-art')
                    }}>My Art
                    </button>
              </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
        </ul>
      </>
    );
}