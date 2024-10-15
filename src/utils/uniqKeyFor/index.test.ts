import uniqKeyFor from './index';

describe('uniqKeyFor', () => {
  beforeEach(() => {
    // Mock the Date object to return a constant value for `getTime`
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1609459200000); // Mocking a fixed timestamp (2021-01-01)
  });

  afterEach(() => {
    // Restore the Date object to its original state after each test
    jest.restoreAllMocks();
  });

  it('should increment uniqKeyFlag on each call', () => {
    const result1 = uniqKeyFor();
    const result2 = uniqKeyFor();
    const result3 = uniqKeyFor();

    expect(result1).toBe('u-1609459200000-1');
    expect(result2).toBe('u-1609459200000-2');
    expect(result3).toBe('u-1609459200000-3');
  });

  it('should return a unique key with the correct format', () => {
    const result = uniqKeyFor();
    expect(result).toMatch(/^u-\d{13}-\d+$/); // Match format like 'u-<timestamp>-<flag>'
  });

  it('should return unique keys on consecutive calls', () => {
    const result1 = uniqKeyFor();
    const result2 = uniqKeyFor();

    expect(result1).not.toBe(result2); // The two results should be different
  });
});
