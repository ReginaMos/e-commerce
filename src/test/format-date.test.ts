import { describe, it, expect } from 'vitest';
import { formatDateISO8601 } from '../utils/format-date';

describe('Test format date to ISO8601', () => {
  it('formats a Date object as YYYY-MM-DD', () => {
    const date = new Date(2024, 4, 9);
    expect(formatDateISO8601(date)).toBe('2024-05-09');
  });

  it('pads single-digit months and days with zero', () => {
    const date = new Date(2024, 0, 1);
    expect(formatDateISO8601(date)).toBe('2024-01-01');
  });

  it('handles end of year correctly', () => {
    const date = new Date(1999, 11, 31);
    expect(formatDateISO8601(date)).toBe('1999-12-31');
  });
});
