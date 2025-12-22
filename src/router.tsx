// src\router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './lib/routes';
import { lazy, Suspense, type JSX } from 'react';
import NotFoundPage from './pages/NotFound';

const HomePage = lazy(() => import('./pages/Home/HomePage'));

// Если сделать lazy, будет выскакивать FallbackErrorView
// const NotFoundPage = lazy(() => import('./pages/NotFound'));

const ResultPage = lazy(() => import('./pages/Result'));
const ResultGroupPage = lazy(() => import('./pages/ResultGroup'));

const withSuspense = (element: JSX.Element) => (
  <Suspense
    fallback={
      <div style={{ margin: 'auto', textAlign: 'center' }}>Загрузка...</div>
    }
  >
    {element}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: withSuspense(<HomePage />),
  },
  {
    path: ROUTES.result,
    element: withSuspense(<ResultPage />),
  },
  {
    path: ROUTES.result_group,
    element: withSuspense(<ResultGroupPage />),
  },
  {
    path: '*',
    element: withSuspense(<NotFoundPage />),
  },
]);
