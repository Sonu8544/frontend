import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addUser } from '../utils/userSlice';
import UserCard from "./UserCard";
import toast from 'react-hot-toast';
import EditPrifileCard from './EditPrifileCard';

const EditProfile = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [about, setAbout] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillsInput, setSkillsInput] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setAbout(user.about || '');
            setAge(user.age || '');
            setGender(user.gender || '');
            setSkills(user.skills || []);
            setSkillsInput((user.skills || []).join(', '));
            if (user.photo) {
                setPreviewUrl(`data:image/jpeg;base64,${user.photo}`);
            }
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const saveProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("about", about);
            formData.append("age", age);
            formData.append("gender", gender);
            skills.forEach(skill => formData.append("skills", skill));
            if (photo) formData.append("photo", photo);

            const res = await axios.patch(`${BASE_URL}/profile/edit`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            const updatedUser = res?.data?.user;
            if (updatedUser) {
                dispatch(addUser(updatedUser));
                toast.success('Profile updated successfully!');
            } else {
                throw new Error("No user data returned from API");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            setError(error.message || "An error occurred while saving the profile.");
            toast.error('Failed to update profile.');
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
                        <span className="label-text">Profile Photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="file-input file-input-bordered w-full max-w-xs"
                        />
                        {/* {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-24 h-24 mt-2 rounded-full object-cover"
                            />
                        )} */}
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
                        <span className="label-text">Interests</span>
                        <input
                            type="text"
                            value={skillsInput}
                            onChange={(e) => {
                                const input = e.target.value;
                                setSkillsInput(input);
                                const parsed = input
                                    .split(',')
                                    .map(skill => skill.trim())
                                    .filter(skill => skill);
                                setSkills(parsed);
                            }}
                            placeholder="Skills (comma separated)"
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

            {/* <UserCard user={{ firstName, lastName, about, age, gender, photo: previewUrl }} /> */}
            <EditPrifileCard user={{ firstName, lastName, about, age, gender, photo: previewUrl }}/>
        </div>
    );
};

export default EditProfile;
