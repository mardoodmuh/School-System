// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';

const Home = () => {
  return (
    <Box component={Paper} elevation={3} p={4} mt={5}>
      <Typography variant="h5" component="h2" gutterBottom>
        ホームページ
      </Typography>
      <nav>
        <Button component={Link} to="/classes" variant="contained" color="primary" fullWidth>
          コース
        </Button>
        <Button component={Link} to="/homework" variant="contained" color="primary" fullWidth>
          課題欄
        </Button>
        <Button component={Link} to="/logout" variant="contained" color="primary" fullWidth>
          ログアウト
        </Button>
      </nav>
    </Box>
  );
};

export default Home;