import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
    const [emailId, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [isLoginForm, setIsLoginForm] = useState(true)


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(BASE_URL + '/login', {
                emailId,
                password,
            },
                { withCredentials: true } // Include credentials for CORS requests
            )
            dispatch(addUser(res.data))
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    // Handle Sign Up
    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + '/signup', {
                firstName,
                lastName,
                emailId,
                password,
                gender,
            },
                { withCredentials: true }
            )
            dispatch(addUser(res.data.data))
            return navigate('/profile')
        } catch (err) {
            console.log("error during signUP", err)
        }
    }


    return (
        <div className="flex justify-center mt-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-6">{isLoginForm ? "Login" : "SignUp"}</h2>
                    {!isLoginForm && (
                        <>
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
                                    <span className="label-text">Gender</span>
                                </div>
                                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" className="input input-bordered w-full max-w-xs" />
                            </label>
                        </>)
                    }
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email ID</span>
                        </div>
                        <input type="email" value={emailId} onChange={(e) => setEmail(e.target.value)} placeholder="john@gmail.com" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <div className="card-actions justify-center mt-6">
                        <button onClick={isLoginForm ? handleLogin : handleSignUp} className="btn btn-outline btn-primary w-full">{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p>
                        {isLoginForm ? "Don't have an account?" : "Already have an account?"}
                        <button className="btn btn-link" onClick={() => setIsLoginForm(!isLoginForm)}>
                            {isLoginForm ? "Sign Up" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login