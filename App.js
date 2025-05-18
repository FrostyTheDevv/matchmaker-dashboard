// src/App.js
import React from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProfilesPage from './pages/ProfilesPage';
import QueuePage    from './pages/QueuePage';
import SettingsPage from './pages/SettingsPage';
import { theme }    from './theme';
import './index.css';  // your global styles (optional)

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex minH="100vh">
          <Sidebar />
          <Box flex="1" p={6}>
            <Routes>
              <Route path="/"        element={<ProfilesPage />} />
              <Route path="/queue"   element={<QueuePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* Redirect any unknown path back to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;