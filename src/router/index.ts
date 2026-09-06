import { ColdChain } from '@/ui/pages/coldChain';
import { Home } from '@/ui/pages/Home';
import { HomeCloud } from '@/ui/pages/homeCloud';
import { Irrigate } from '@/ui/pages/Irrigate';
import { NotFound } from '@/ui/pages/NotFound';
import { Root } from '@/ui/Root';
import { T4S } from '@/ui/pages/T4S';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'homecloud', Component: HomeCloud },
      { path: 'coldchain', Component: ColdChain },
      { path: 'irrigate', Component: Irrigate },
      { path: 't4s', Component: T4S },
    ]
  },
  {
    path: '*',
    Component: NotFound
  }
]);
