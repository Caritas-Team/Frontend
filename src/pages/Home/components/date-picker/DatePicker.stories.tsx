// src\pages\Home\components\date-picker\DatePicker.stories.tsx

/* Импорт из @storybook/react, потому что пишем на React */
import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from './DatePicker';
import { useState } from 'react';

const meta = {
  /* Название компонента и путь, по которому его нужно отобразить на витрине */
  title: 'components/DatePicker',
  /* Передаём сам компонент */
  component: DatePicker,
  /* Тег autodocs просит Storybook сгенерировать отдельную историю с документацией компонента */
  tags: ['autodocs'],

  argTypes: {
    onChange: { action: 'changed' }, // чтобы видеть вызовы в Actions панели
  },

  /* satisfies помогает точнее определить тип */
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoDatePicker = (args: Story['args']) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <DatePicker
      {...args}
      value={value}
      onChange={newVal => {
        setValue(newVal);
        args.onChange?.(newVal);
      }}
    />
  );
};

export const Default: Story = {
  args: {
    value: '2025-11-10',
    label: 'Дата отчёта',
    required: true,
    error: '',
    onChange: () => {},
  },
  render: args => <DemoDatePicker {...args} />,
};

export const WithError: Story = {
  args: {
    value: '2025-11-10',
    label: 'Дата отчёта (с ошибкой)',
    required: true,
    error: 'Неверный формат даты',
    onChange: () => {},
  },
  render: args => <DemoDatePicker {...args} />,
};
