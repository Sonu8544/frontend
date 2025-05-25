import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {
    const [emailId, setEmail] = useState('sonu@gmail.com')
    const [password, setPassword] = useState('Sonu@123')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post( BASE_URL + '/login', {
                emailId,
                password,
            });
            dispatch(addUser(res.data))
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="flex justify-center mt-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-6">Login</h2>
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
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="**********" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <div className="card-actions justify-center mt-6">
                        <button onClick={handleLogin} className="btn btn-outline btn-primary w-full">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login