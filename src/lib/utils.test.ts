import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
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

  test('проверка корректной даты - начало года', () => {
    const result = isValidDate('2025-01-01');
    expect(result).toBe(true);
  });

  test('проверка корректной даты - конец года', () => {
    const result = isValidDate('2025-12-31');
    expect(result).toBe(true);
  });

  test('проверка корректной даты - 29 февраля високосного года', () => {
    const result = isValidDate('2024-02-29');
    expect(result).toBe(true);
  });

  test('проверка корректной даты - 29 февраля високосного года', () => {
    const result = isValidDate('2000-02-29');
    expect(result).toBe(true);
  });

  test('проверка некорректной даты - 29 февраля невисокосного года', () => {
    const result = isValidDate('2025-02-29');
    expect(result).toBe(false);
  });

  test('проверка некорректной даты - 29 февраля невисокосного года', () => {
    const result = isValidDate('2100-02-29');
    expect(result).toBe(false);
  });

  test('проверка некорректной (несуществующей) даты - 15-ый месяц', () => {
    const result = isValidDate('2015-15-14');
    expect(result).toBe(false);
  });

  test('проверка некорректной (несуществующей) даты - 30 февраля', () => {
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
  // заморозка текущей даты на 05 декабря 2025 года
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-12-05T12:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('вычисление корректного возраста (день рождения - 15 декабря - еще не наступил в этом году)', () => {
    const result = calculateAge('2015-12-15');
    expect(result).toBe('9 лет');
  });

  test('вычисление корректного возраста (день рождения - 01 декабря - уже наступил в этом году)', () => {
    const result = calculateAge('2015-12-01');
    expect(result).toBe('10 лет');
  });

  test('вычисление корректного возраста с окончанием "год" (день рождения уже наступил в этом году)', () => {
    const result = calculateAge('2004-10-08');
    expect(result).toBe('21 год');
  });

  test('вычисление корректного возраста с окончанием "год" (день рождения - 21 декабря - еще не наступил в этом году)', () => {
    const result = calculateAge('1993-12-21');
    expect(result).toBe('31 год');
  });

  test('вычисление корректного возраста с окончанием "года" (день рождения уже наступил в этом году)', () => {
    const result = calculateAge('2021-06-24');
    expect(result).toBe('4 года');
  });

  test('вычисление корректного возраста с окончанием "года" (день рождения еще наступил в этом году)', () => {
    const result = calculateAge('2021-12-11');
    expect(result).toBe('3 года');
  });

  test('дата рождения позже сегодняшней', () => {
    const result = calculateAge('2025-12-06');
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
    expect(result).toBe('');
  });

  test('форматирование некорректной даты', () => {
    const result = formatDateShort('20200132');
    expect(result).toBe('');
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

  test('сокращение строки, случай 4 - пустая строка', () => {
    const result = makeShortName('', 10, 10);
    expect(result).toBe('');
  });
});
