import { describe, test, expect } from 'vitest';
import {
  calculateAge,
  formatDateShort,
  isValidDate,
  makeShortName,
} from './utils';

describe('тестирование функции проверки валидности даты', () => {
  test('проверка корректной даты', () => {
    const result = isValidDate('2015-04-03');
    expect(result).toBe(true);
  });

  test('проверка некорректной (несуществующей) даты', () => {
    const result = isValidDate('2015-15-14');
    expect(result).toBe(false);
  });

  test('проверка некорректной (несуществующей) даты', () => {
    const result = isValidDate('2015-02-30');
    expect(result).toBe(false);
  });

  test('проверка даты в некорректном формате', () => {
    const result = isValidDate('2015-012-4');
    expect(result).toBe(false);
  });

  test('проверка даты в некорректном формате', () => {
    const result = isValidDate('20150224');
    expect(result).toBe(false);
  });

  test('проверка даты в некорректном формате', () => {
    const result = isValidDate('date');
    expect(result).toBe(false);
  });
});

describe('тестирование функции вычисления возраста', () => {
  test('вычисление корректного возраста с окончанием "лет"', () => {
    const result = calculateAge('2015-04-03');
    expect(result).toBe('10 лет');
  });

  test('вычисление корректного возраста с окончанием "год"', () => {
    const result = calculateAge('2004-10-14');
    expect(result).toBe('21 год');
  });

  test('вычисление корректного возраста с окончанием "года"', () => {
    const result = calculateAge('2021-08-22');
    expect(result).toBe('4 года');
  });

  test('дата рождения позже сегодняшней', () => {
    const result = calculateAge('2026-08-22');
    expect(result).toBe('дата рождения превышает текущую');
  });

  test('несуществующая дата рождения', () => {
    const result = calculateAge('2025-08-32');
    expect(result).toBe('');
  });

  test('дата рождения в некорректном формате', () => {
    const result = calculateAge('20250830');
    expect(result).toBe('');
  });
});

describe('тестирование функции форматирования даты', () => {
  test('форматирование корректной даты', () => {
    const result = formatDateShort('2015-08-16');
    expect(result).toBe('16.08.2015');
  });

  test('форматирование корректной даты', () => {
    const result = formatDateShort('2026-05-09');
    expect(result).toBe('09.05.2026');
  });

  test('форматирование некорректной даты', () => {
    const result = formatDateShort('2020-01-32');
    expect(result).toBe('Invalid Date');
  });

  test('форматирование некорректной даты', () => {
    const result = formatDateShort('20200132');
    expect(result).toBe('Invalid Date');
  });
});

describe('тестирование функции сокращения строки', () => {
  test('сокращение строки, случай 1', () => {
    const result = makeShortName('Высококвалифицированный специалист', 10, 10);
    expect(result).toBe('Высококвал. специалист');
  });

  test('сокращение строки, случай 2', () => {
    const result = makeShortName('Расстройства аутистического спектра', 3, 1);
    expect(result).toBe('Р. а. с.');
  });

  test('сокращение строки, случай 3', () => {
    const result = makeShortName('Инсулинозависимый сахарный диабет', 6, 1);
    expect(result).toBe('И. с. диабет');
  });
});
