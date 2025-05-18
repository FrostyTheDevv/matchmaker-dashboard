import React from 'react';
import { Box, VStack, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();
  const links = [
    { label: 'Profiles', to: '/' },
    { label: 'Queue',    to: '/queue' },
    { label: 'Settings', to: '/settings' },
  ];

  return (
    <Box
      w="200px"
      bg="brand.800"
      color="white"
      p={4}
      borderRight="2px solid"
      borderColor="brand.600"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Matchmaker
      </Text>
      <VStack spacing={4} align="stretch">
        {links.map(link => (
          <ChakraLink
            as={Link}
            key={link.to}
            to={link.to}
            px={3}
            py={2}
            borderRadius="md"
            bg={pathname === link.to ? 'brand.600' : 'transparent'}
            _hover={{ bg: 'brand.700' }}
          >
            {link.label}
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
