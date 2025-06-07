import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, about, age, gender, photo } = user || {};

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleSendRequest = async (status, userId) => {
        try {
            await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {
                withCredentials: true
            });
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    // Base64 image source
    const renderPhoto = photo
        ? `data:image/jpeg;base64,${photo}`
        : "https://img.freepik.com/free-photo/stylish-couple-love-sitting-street-romantic-trip-taking-photo_285396-9916.jpg?t=st=1749311088~exp=1749314688~hmac=94062e9c61bbb0cc8e5f819b84560fefa813a1b12d4c3ecf6b114c9cd45b1bdc&w=1380"; // fallback image

    return (
        <div className="flex justify-center my-8">
            <div className="card bg-base-200 w-96 shadow-sm">
                <figure>
                    <img
                        src={renderPhoto}
                        alt={`${firstName}'s profile`}
                        className="object-cover w-full h-64"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName} {lastName}</h2>
                    {age && gender && <p>{age} {gender}</p>}
                    <p>{about}</p>
                    {_id &&
                        <div className="card-actions justify-center gap-10">
                            <button className="btn btn-soft btn-secondary" onClick={() => handleSendRequest("ignored", _id)}>
                                Ignore
                            </button>
                            <button className="btn btn-soft btn-success" onClick={() => handleSendRequest("interested", _id)}>
                                Interested
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserCard;
