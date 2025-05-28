import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addUser } from '../utils/userSlice';
import UserCard from "./UserCard";

const EditProfile = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [about, setAbout] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState(null);

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setPhotoUrl(user.photoUrl || '');
            setAbout(user.about || '');
            setAge(user.age || '');
            setGender(user.gender || '');
        }
    }, [user]);

    const saveProfile = async () => {
        try {
            const res = await axios.patch(
                `${BASE_URL}/profile/edit`,
                {
                    firstName,
                    lastName,
                    photoUrl,
                    about,
                    age,
                    gender,
                },
                { withCredentials: true }
            );

            const updatedUser = res?.data?.user;

            if (updatedUser) {
                dispatch(addUser(updatedUser));
            } else {
                throw new Error("No user data returned from API");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            setError(error.message || "An error occurred while saving the profile.");
        }
    };

    if (!user) {
        return <div className="flex justify-center mt-10">Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center gap-10 flex-wrap mt-10 px-4">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-6">Edit Profile</h2>

                    <label className="form-control w-full max-w-xs">
                        <span className="label-text">First Name</span>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    <label className="form-control w-full max-w-xs mt-4">
                        <span className="label-text">Last Name</span>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    <label className="form-control w-full max-w-xs mt-4">
                        <span className="label-text">Photo URL</span>
                        <input
                            type="text"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            placeholder="Photo URL"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    <label className="form-control w-full max-w-xs mt-4">
                        <span className="label-text">Age</span>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Age"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    <label className="form-control w-full max-w-xs mt-4">
                        <span className="label-text">Gender</span>
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="Gender"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    <label className="form-control w-full max-w-xs mt-4">
                        <span className="label-text">About</span>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder="About Me"
                            className="textarea textarea-bordered w-full max-w-xs"
                        />
                    </label>

                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}

                    <div className="card-actions justify-center mt-6">
                        <button
                            className="btn btn-outline btn-primary w-full"
                            onClick={saveProfile}
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>

            <UserCard user={{ firstName, lastName, photoUrl, about, age, gender }} />
        </div>
    );
};

export default EditProfile;
