import React from 'react';
import UserProfile from './UserProfile';
import { Spinner } from 'react-bootstrap';

const Profile = () => {

  const { userInfo, loading, error } = UserProfile();

  if (loading) return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User Information</h2>
      {userInfo && (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Role: {userInfo.role}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      )}
    </div>
  );

};

export default Profile;
