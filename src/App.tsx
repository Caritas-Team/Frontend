// src\App.tsx

import { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './ui/ErrorBoundary';
import FallbackErrorView from './ui/FallbackErrorView';
import { ROUTES } from './lib/routes';

// ленивые импорты страниц
const HomePage = lazy(() => import('./pages/Home'));
const ResultPage = lazy(() => import('./pages/Result'));

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<FallbackErrorView message="Загрузка…" />}>
          <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.result} element={<ResultPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
