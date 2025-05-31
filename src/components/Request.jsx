import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Request = () => {
    const request = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id))
        } catch (error) {
            console.error("Error reviewing request:", error);
        }
    }

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/requests/received', { withCredentials: true });
            dispatch(addRequests(res.data.data));

        } catch (error) {
            console.error("Error fetching request:", error);
        }
    }

    useEffect(() => {
        fetchRequest();
    }, []);

    if (!request) return null;

    if (request.length === 0) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold">No Connections Found</h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-10 mb-4 text-white">Connections Requests!</h1>
            <div className="relative flex w-[500px] flex-col rounded-lg border border-base-300 bg-base-200 shadow-sm m-auto">
                <nav className="flex min-w-[300px] flex-col gap-1 p-1.5">
                    {request.map((requestItem) => {
                        const { _id, firstName, lastName, photoUrl, about, age, gender } = requestItem.fromUserId;

                        return (
                            <div
                                key={_id}
                                role="button"
                                className="flex w-full items-center justify-between rounded-md p-3 transition-all hover:bg-base-100 focus:bg-base-100 active:bg-base-100"
                            >
                                <div className="mr-4 grid place-items-center">
                                    <img
                                        alt="user"
                                        src={photoUrl}
                                        className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                                    />
                                </div>
                                <div>
                                    <h6 className="font-medium">{firstName + ' ' + lastName}</h6>
                                    <p className="text-sm">
                                        {(about?.split(' ').slice(0, 7).join(' ') || 'No bio available') +
                                            (about?.split(' ').length > 7 ? '...' : '')}
                                    </p>
                                </div>
                                <button className="btn btn-outline btn-primary" onClick={() => reviewRequest("rejected", requestItem._id)} >Reject</button>
                                <button className="btn btn-outline btn-secondary" onClick={() => reviewRequest("accepted", requestItem._id)}>Accept</button>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    );

}

export default Request