// src\components\ErrorBoundary.tsx
// общий компонент границы ошибок

import { FallbackErrorView } from '@/components/FallbackErrorView';
import React from 'react';

type ErrorBoundaryState = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _info: unknown) {
    // сюда можно прикрутить логирование
    console.error(_error, _info);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackErrorView message={this.state.error?.message} />;
    }
    return this.props.children;
  }
}
