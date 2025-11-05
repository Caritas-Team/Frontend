import type { ReactNode } from 'react';

interface PageLayoutProps {
  content: ReactNode;
}

export const PageLayout = ({ content }: PageLayoutProps) => {
  return (
    <>
      <div>{content}</div>
    </>
  );
};
