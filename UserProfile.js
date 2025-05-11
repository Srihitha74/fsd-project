import React from 'react';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
    const location = useLocation();
    const { message, user } = location.state || {};

    if (!user) {
        return <p>No user data available.</p>;
    }

    return (
        <div className="flex items-center gap-4 p-4">
            <img
                src="https://static.thenounproject.com/png/363633-200.png"  // Replace with your actual image URL
                alt="Profile"
                className="h-9 w-9 rounded-full"
                style={{ height: '2.25rem', width: '2.25rem', borderRadius: '50%' }} //Added inline styles
            />
            <div>
                <h2>{message}</h2>
                <div className="profile-details">
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    {/* Add more user details here if available */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
