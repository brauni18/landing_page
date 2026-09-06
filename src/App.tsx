import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@/hooks/useTheme';
import { router } from '@/router';
import '@/styles/index.css';

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
