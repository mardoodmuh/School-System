import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeworkSubmissions from './HomeworkSubmissions';

const HomeworkManagement = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [showSubmissionsDialog, setShowSubmissionsDialog] = useState(false);

  const token = localStorage.getItem('token');
  
  // Fetch homework assignments
  const fetchHomeworks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/homeworks/', {
        headers: { Authorization: `Token ${token}` },
      });
      setHomeworks(response.data);
    } catch (error) {
      console.error('Failed to fetch homeworks:', error);
    }
  };

  useEffect(() => {
    fetchHomeworks();
  }, []);

  // Handle homework creation
  const handleCreateHomework = async () => {
    try {
      await axios.post('http://localhost:8000/api/homeworks/', {
        title: String,
        description: String,
        assigned_class: Number,
        created_by: Number,
        due_date: String,
      }, {
        headers: { Authorization: `Token ${token}` },
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      fetchHomeworks();
    } catch (error) {
      console.error('Failed to create homework:', error);
    }
  };

  // Handle delete homework
  const handleDeleteHomework = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/homeworks/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchHomeworks();
      setAnchorEl(null);
    } catch (error) {
      console.error('Failed to delete homework:', error);
    }
  };

  const handleClickMenu = (event, homework) => {
    setAnchorEl(event.currentTarget);
    setSelectedHomework(homework);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleShowSubmissions = (homework) => {
    setSelectedHomework(homework);
    setShowSubmissionsDialog(true);
  };

  const handleCloseDialog = () => {
    setShowSubmissionsDialog(false);
    setSelectedHomework(null);
  };

  return (
    <Box component={Paper} elevation={3} p={4} mt={5}>
      <Typography variant="h5" component="h2" gutterBottom>
        課題管理
      </Typography>
      <Box mb={3}>
        <TextField
          label="タイトル"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="問題"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="受付終了日時"
          type="datetime-local"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleCreateHomework}>
          課題作成
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        作成された課題リスト
      </Typography>
      <List>
        {homeworks.map((homework) => (
          <ListItem key={homework.id}>
            <ListItemText
              primary={homework.title}
              secondary={`Due Date: ${new Date(homework.due_date).toLocaleString()}`}
            />
            <IconButton
              edge="end"
              aria-label="more"
              onClick={(event) => handleClickMenu(event, homework)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl && selectedHomework === homework)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => handleShowSubmissions(homework)}>提出一覧</MenuItem>
              <MenuItem onClick={() => handleDeleteHomework(homework.id)}>削除</MenuItem>
            </Menu>
          </ListItem>
        ))}
      </List>

      {/* Dialog to show homework submissions */}
      <Dialog
        open={showSubmissionsDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>提出一覧</DialogTitle>
        <DialogContent>
          {selectedHomework && (
            <HomeworkSubmissions homeworkId={selectedHomework.id} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HomeworkManagement;
