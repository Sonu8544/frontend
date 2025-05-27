import React, { useState } from 'react'
import UserCard from "./UserCard";
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    if (!user) {
        return <div className="flex justify-center mt-10">Loading...</div>
    }
    const [firstName, setFirstName] = useState(user.firstName || '')
    const [lastName, setLastName] = useState(user.lastName || '')
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '')
    const [about, setAbout] = useState(user.about || '')
    const [age, setAge] = useState(user.age || '')
    const [gender, setGender] = useState(user.gender || '')
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', {
                firstName,
                lastName,
                photoUrl,
                about,
                age,
            }, { withCredentials: true });
            dispatch(addUser(res?.data?.data || {}));
            console.log("Profile updated successfully:", res.data);
        } catch (error) {
            console.error("Error saving profile:", error);
            setError(error.message || "An error occurred while saving the profile.");
        }
    }

    return (
        <div className='flex justify-center items-center gap-10'>
            <div className="flex justify-center mt-10">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center mb-6">Edit Profile</h2>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Photo URL</span>
                            </div>
                            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Photo URL" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Age</span>
                            </div>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">About</span>
                            </div>
                            <textarea type="textarea" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About Me" className="textarea" />
                        </label>

                        <div className="card-actions justify-center mt-6">
                            <button className="btn btn-outline btn-primary w-full" onClick={saveProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, photoUrl, about, age, gender }} />
        </div>
    )
}

export default EditProfile