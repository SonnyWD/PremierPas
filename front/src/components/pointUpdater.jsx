import React, { useEffect, useState } from 'react';
import { addPoints } from '../services/user';

function PointUpdater() {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints) : 0;
  });
  

  useEffect(() => {
    console.log("✅ PointUpdater monté");
    const token = localStorage.getItem('token');
    console.log("Token localStorage:", token);
    if (token) {
      addPoints(token)
        .then(data => {
          setPoints(data.points);  
          localStorage.setItem('points', data.points.toString());
          console.log('Points mis à jour:', data);
        })
        .catch(err => {
          console.error('Erreur:', err);
        });
    }
  }, []);

  return (
    <div>
      <h2>🎯 Mise à jour des points</h2>
      <p>Points actuels: {points}</p>  
    </div>
  );
}

export default PointUpdater;
