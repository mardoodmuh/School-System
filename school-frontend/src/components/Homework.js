// src/components/Homework.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Homework = () => {
  const [homework, setHomework] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/api/homeworks/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setHomework(response.data);
      } catch (error) {
        console.error('Fetching homework failed:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box component={Paper} elevation={3} p={4} mt={5}>
      <Typography variant="h5" component="h2" gutterBottom>
        課題一覧
      </Typography>
      <List>
        {homework.map((hw) => (
          <ListItem key={hw.id}>
            <ListItemText primary={hw.title} />
            <Button component={Link} to={`/homework/${hw.id}/submit`} variant="contained" color="primary">
              送信
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Homework;
