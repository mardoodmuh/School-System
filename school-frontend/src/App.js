import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Classes from './components/Classes';
import Homework from './components/Homework';
import HomeworkSubmission from './components/HomeworkSubmissions';
import HomeworkManagement from './components/HomeworkManagement';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            学校管理
          </Typography>
          <Button color="inherit" component={Link} to="/">
            ホームページ
          </Button>
          <Button color="inherit" component={Link} to="/classes">
            コース
          </Button>
          <Button color="inherit" component={Link} to="/homework">
            課題
          </Button>
          <Button color="inherit" component={Link} to="/homework-management">
            課題管理
          </Button>
          <Button color="inherit" component={Link} to="/logout">
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/homework/:homeworkId/submit" element={<HomeworkSubmission />} />
          <Route path="/homework-management" element={<HomeworkManagement />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
