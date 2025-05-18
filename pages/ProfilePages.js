import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Input, Select, Table, Thead, Tbody,
  Tr, Th, Td, Button, Spinner, HStack
} from '@chakra-ui/react';

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch]         = useState('');
  const [approvedFilter, setApprovedFilter] = useState('true');
  const [loading, setLoading]       = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/profiles?approved=${approvedFilter}&search=${encodeURIComponent(search)}`
    );
    const data = await res.json();
    setProfiles(data);
    setLoading(false);
  };

  const toggleApproval = async (userId, currentlyApproved) => {
    await fetch(`/api/profiles/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: currentlyApproved ? 0 : 1 })
    });
    fetchProfiles();
  };

  useEffect(() => {
    fetchProfiles();
  }, [approvedFilter]);

  return (
    <Box>
      <Heading mb={4}>Profiles</Heading>

      <HStack mb={4} spacing={4}>
        <Input
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchProfiles()}
        />
        <Select
          w="150px"
          value={approvedFilter}
          onChange={e => setApprovedFilter(e.target.value)}
        >
          <option value="true">Approved</option>
          <option value="false">Pending</option>
          <option value="">All</option>
        </Select>
        <Button onClick={fetchProfiles} colorScheme="pink">Refresh</Button>
      </HStack>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Table variant="simple" colorScheme="pink">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Gender</Th>
              <Th>Bio</Th>
              <Th>Approved</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {profiles.map(p => (
              <Tr key={p.user_id}>
                <Td>{p.name}</Td>
                <Td>{p.age}</Td>
                <Td>{p.gender}</Td>
                <Td>{p.bio}</Td>
                <Td>{p.approved ? 'Yes' : 'No'}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme={p.approved ? 'red' : 'green'}
                    onClick={() => toggleApproval(p.user_id, p.approved)}
                  >
                    {p.approved ? 'Revoke' : 'Approve'}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default ProfilesPage;