import React from 'react';
import PointUpdater from '../components/pointUpdater'; 
import LogoutButton from '../components/logoutBtn';

function UserProfile() {
  return (
    <div>
      <h1>Profil de l'utilisateur</h1>
      <PointUpdater /> 
      <LogoutButton/>
    </div>
  );
}

export default UserProfile;
