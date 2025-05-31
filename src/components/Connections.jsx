import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const connections = useSelector((state) => state.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            });
            dispatch(addConnections(res.data.data))
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if (connections.length === 0) {
        return (
            <div className="text-center mt-10">
                <h1 className="text-2xl font-bold">No Connections Found</h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-10 mb-4 text-white">Connections!</h1>
            <div className="relative flex w-96 flex-col rounded-lg border border-base-300 bg-base-200 shadow-sm m-auto">
                <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
                    {connections.map((connection) => {
                        const { _id, firstName, lastName, photoUrl, about, age, gender } = connection;
                        return (
                            <div
                                key={_id}
                                role="button"
                                className="flex w-full items-center rounded-md p-3 transition-all hover:bg-base-100 focus:bg-base-100 active:bg-base-100"
                            >
                                <div className="mr-4 grid place-items-center">
                                    <img
                                        alt="candice"
                                        src={photoUrl}
                                        className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                                    />
                                </div>
                                <div>
                                    <h6 className="font-medium">
                                        {firstName + ' ' + lastName}
                                    </h6>
                                    <p className="text-sm">
                                        {(about?.split(' ').slice(0, 7).join(' ') || 'No bio available') +
                                            (about?.split(' ').length > 7 ? '...' : '')}
                                    </p>
                                </div>
                            </div>
                        )

                    })}
                </nav>
            </div>
        </div>
    )
}

export default Connections