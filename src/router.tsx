// src\router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './lib/routes';
import { lazy, Suspense } from 'react';
import NotFoundPage from './pages/NotFound';
import { Layout } from '@widgets/layout';

const MainBlockForm = lazy(
  () => import('./pages/Home/components/MainBlockForm/MainBlockForm')
);
// Если сделать lazy, будет выскакивать FallbackErrorView
// const NotFoundPage = lazy(() => import('./pages/NotFound'));
const ResultPage = lazy(() => import('./pages/Result'));

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <Navigate to={ROUTES.form} replace />,
  },
  {
    path: ROUTES.form,
    element: <Layout />,
    children: [
      {
        path: ROUTES.form,
        element: (
          <Suspense>
            <MainBlockForm />
          </Suspense>
        ),
      },
    ],
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
