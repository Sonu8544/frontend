import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';
import { clearFeed } from '../utils/feedSlice';

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
            dispatch(removeUser());
            dispatch(clearFeed());
            navigate('/login');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const renderProfileImage = () => {
        if (user?.photo) {
            return `data:image/jpeg;base64,${user.photo}`;
        } else {
            return 'https://static.vecteezy.com/system/resources/previews/045/711/185/non_2x/male-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style-free-vector.jpg'; // fallback placeholder
        }
    };

    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">💏 Connact </Link>
                {/*🧑‍🤝‍🧑 💏 */}
            </div>

            {user && (
                <div className="flex-none gap-2">
                    <p>{user.firstName}</p>
                    <div className="dropdown dropdown-end mx-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Profile"
                                    src={renderProfileImage()}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to="/requests">Requests</Link></li>
                            <li><Link to="/connectons">Connecton</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
