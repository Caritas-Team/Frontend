// src\App.tsx

import { Suspense } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { FallbackErrorView } from '@/components/FallbackErrorView.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FallbackErrorView message="Загрузка…" />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}
