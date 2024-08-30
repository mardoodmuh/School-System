import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Box, Typography, Paper } from '@mui/material';

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/api/classes/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setClasses(response.data);
      } catch (error) {
        console.error('Fetching classes failed:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box component={Paper} elevation={3} p={4} mt={5}>
      <Typography variant="h5" component="h2" gutterBottom>
        コース一覧
      </Typography>
      <List>
        {classes.map((cls) => (
          <ListItem key={cls.id}>
            <ListItemText primary={cls.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Classes;
