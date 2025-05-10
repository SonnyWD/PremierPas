import axios from 'axios';
console.log('Tentative d\'ajout des points');
export const addPoints = async (token) => {
  try {
    console.log("Tentative d'ajout des points avec le token:", token);
    const response = await axios.post('http://localhost:3000/users/update-points', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Réponse du backend :', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des points:', error);
    throw error;
  }
};