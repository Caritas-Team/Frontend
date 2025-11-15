// src\App.tsx

import { Suspense } from 'react';
import './App.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { FallbackErrorView } from '@/components/FallbackErrorView';
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
