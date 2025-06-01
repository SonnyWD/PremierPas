import axios from 'axios';

export const addPoints = async (token) => {
  try {
    const response = await axios.post('http://localhost:3000/users/update-points', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};