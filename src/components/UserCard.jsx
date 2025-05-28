import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, about, age, gender, photoUrl } = user || {};
    if (!user) {
        return <div>Loading...</div>
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
                        <button className="btn btn-soft btn-secondary">Ignore</button>
                        <button className="btn btn-soft btn-success">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard