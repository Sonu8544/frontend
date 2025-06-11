import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'
import ToastProvider from './ToastProvider'
import NavBar from './NavBar'
// import NavBar from './NavBar'


const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((store) => store.user)

    const fetchUser = async () => {
        if (userData) return; // If user data is already present, skip fetching
        try {
            const res = await axios.get(BASE_URL + '/profile/view', {
                withCredentials: true
            })
            dispatch(addUser(res.data))
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else {
                console.log("Error fetching user data:", error);
            }
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div>
            {/* <NavBar /> */}
            <NavBar />
            <Outlet />
            {/* <Footer /> */}
            <ToastProvider />
        </div>
    )
}

export default Body