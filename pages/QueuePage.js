import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Table, Thead, Tbody,
  Tr, Th, Td, Spinner, VStack, Text
} from '@chakra-ui/react';

const QueuePage = () => {
  const [queue, setQueue]     = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [qRes, hRes] = await Promise.all([
      fetch('/api/queue'),
      fetch('/api/queue/history')
    ]);
    const [qData, hData] = await Promise.all([qRes.json(), hRes.json()]);
    setQueue(qData);
    setHistory(hData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15_000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Heading mb={4}>Current Queue</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <VStack align="start" spacing={2} mb={8}>
          {queue.length === 0
            ? <Text>No one is in queue right now.</Text>
            : queue.map(u => (
              <Text key={u.user_id}>• {u.user_id}</Text>
            ))
          }
        </VStack>
      )}

      <Heading size="md" mb={4}>Match History</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Table variant="simple" colorScheme="pink">
          <Thead>
            <Tr>
              <Th>Thread Name</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map(h => (
              <Tr key={h.thread_id}>
                <Td>{h.thread_name}</Td>
                <Td>{new Date(h.created_at).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default QueuePage;