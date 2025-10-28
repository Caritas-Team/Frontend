// src\App.tsx

import { Suspense } from 'react';
import './App.css';
import ErrorBoundary from './ui/ErrorBoundary';
import FallbackErrorView from './ui/FallbackErrorView';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FallbackErrorView message="Загрузка…" />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}
