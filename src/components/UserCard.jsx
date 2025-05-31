import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, about, age, gender, photoUrl } = user || {};
    if (!user) {
        return <div>Loading...</div>
    }

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL+ "/request/send/" + status + '/' + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.error("Error sending request:", error);

        }
    }
    return (
        <div className="flex justify-center my-8">
            <div className="card bg-base-200 w-96 shadow-sm">
                {photoUrl && <figure>
                    <img
                        src={photoUrl}
                        alt="photo" />
                </figure>}
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ' ' + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-center gap-10">
                        <button className="btn btn-soft btn-secondary" onClick={() => handleSendRequest("ignored", _id)} >Ignore</button>
                        <button className="btn btn-soft btn-success" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard