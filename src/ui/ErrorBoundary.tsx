// src\ui\ErrorBoundary.tsx
// общий компонент границы ошибок

import { Component, type ReactNode } from 'react';
import FallbackErrorView from './FallbackErrorView';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
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
