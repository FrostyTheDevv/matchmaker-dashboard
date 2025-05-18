import React, { useState, useEffect } from 'react';
import {
  Box, Heading, FormControl, FormLabel,
  Input, Button, VStack, useToast, Spinner
} from '@chakra-ui/react';

const SettingsPage = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    matchmakingChannelId: '',
    ticketCategoryId: '',
    modRoleId: ''
  });

  const fetchSettings = async () => {
    setLoading(true);
    const res = await fetch('/api/settings');
    const data = await res.json();
    setSettings(data);
    setLoading(false);
  };

  const saveSettings = async () => {
    setLoading(true);
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    setLoading(false);
    toast({ title: 'Settings saved.', status: 'success', duration: 3000 });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setSettings(s => ({ ...s, [name]: value }));
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box>
      <Heading mb={6}>Bot Settings</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Matchmaking Channel ID</FormLabel>
          <Input
            name="matchmakingChannelId"
            value={settings.matchmakingChannelId}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Ticket Category ID</FormLabel>
          <Input
            name="ticketCategoryId"
            value={settings.ticketCategoryId}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Moderator Role ID</FormLabel>
          <Input
            name="modRoleId"
            value={settings.modRoleId}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="pink" onClick={saveSettings} isLoading={loading}>
          Save Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default SettingsPage;