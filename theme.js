import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: { initialColorMode: 'dark' },
  colors: {
    brand: {
      50: '#ffe4f0',
      100: '#ffb8d2',
      200: '#ff8cba',
      300: '#ff60a3',
      400: '#ff347b',
      500: '#e6005e',
      600: '#b40048',
      700: '#820033',
      800: '#50001f',
      900: '#20000a',
    },
  },
});
