import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import Sidebar from './components/Sidebar';
import ProfilesPage from './pages/ProfilesPage';
import QueuePage    from './pages/QueuePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Flex minH="100vh">
          <Sidebar />
          <Box flex="1" p={6}>
            <Routes>
              <Route path="/"        element={<ProfilesPage />} />
              <Route path="/queue"   element={<QueuePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Box>
        </Flex>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
