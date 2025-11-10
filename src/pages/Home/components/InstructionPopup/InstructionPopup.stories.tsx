// src\pages\Home\components\InstructionPopup\InstructionPopup.stories.tsx

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InstructionPopup } from './InstructionPopup';

const meta = {
  title: 'components/InstructionPopup',
  component: InstructionPopup,
  tags: ['autodocs'],
} satisfies Meta<typeof InstructionPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Открыть инструкцию</button>
      <InstructionPopup isOpen={isOpen} doClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  args: {
    isOpen: true,
    doClose: () => {},
  },
  render: () => <DemoPopup />,
};
