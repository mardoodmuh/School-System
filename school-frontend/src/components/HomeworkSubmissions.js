// src/components/HomeworkSubmissions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const HomeworkSubmissions = ({ homeworkId }) => {
  const [submissions, setSubmissions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/homeworks/${homeworkId}/submissions/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      }
    };
    fetchSubmissions();
  }, [homeworkId, token]);

  return (
    <Paper elevation={3} p={4}>
      <Typography variant="h6" gutterBottom>
        課題ID: {homeworkId}
      </Typography>
      <List>
        {submissions.map((submission) => (
          <ListItem key={submission.id}>
            <ListItemText
              primary={`提出者: ${submission.student.user.username || 'Unknown'}`}
              secondary={`コンテンツ: ${submission.content} | 提出済み: ${new Date(submission.submitted_at).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default HomeworkSubmissions;
