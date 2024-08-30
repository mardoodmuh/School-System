import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('http://localhost:8000/api/auth/logout/', {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then(() => {
        localStorage.removeItem('token');
        navigate('/login');
      }).catch((error) => {
        console.error('Logout failed:', error);
      });
    }
  }, [navigate]);

  return (
    <Box p={4}>
      <Typography variant="h5">Logging out...</Typography>
    </Box>
  );
};

export default Logout;
