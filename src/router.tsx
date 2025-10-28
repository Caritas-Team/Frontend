// src\router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './lib/routes';
import { lazy } from 'react';
import NotFoundPage from './pages/NotFound';

const HomePage = lazy(() => import('./pages/Home'));
// Если сделать lazy, будет выскакивать FallbackErrorView
// const NotFoundPage = lazy(() => import('./pages/NotFound'));
const ResultPage = lazy(() => import('./pages/Result'));

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <HomePage />,
  },
  {
    path: ROUTES.result,
    element: <ResultPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
