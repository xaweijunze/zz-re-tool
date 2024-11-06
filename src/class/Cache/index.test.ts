import Cache from '.';

describe('Cache Class', () => {
  let cache: any;
  const keyEnums = { TEST_KEY: 'testKey' };
  const testKey = 'TEST_KEY';
  const invalidKey = 'INVALID_KEY';
  const testValue = 'testValue';

  beforeEach(() => {
    cache = new Cache(keyEnums);
  });

  it('should initialize with an empty data map and a keyEnums map', () => {
    expect(cache._data instanceof Map).toBe(true);
    expect(cache._keyEnums instanceof Map).toBe(true);
    expect(cache._keyEnums.has(testKey)).toBe(true);
    expect(cache._data.size).toBe(0);
  });

  it('should throw an error if key is not in keyEnums', async () => {
    const fetchFn = jest.fn().mockResolvedValue(testValue);
    await expect(cache.get(invalidKey, fetchFn)).rejects.toThrow(
      `请将${invalidKey}添加到构造枚举中统一管理！`,
    );
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('should throw an error if fetchFn is not a function', async () => {
    const invalidFetchFn = 'not a function';
    await expect(cache.get(testKey, invalidFetchFn)).rejects.toThrow(
      `无法获取${testKey}值！`,
    );
  });

  it('should call fetchFn if key is not in data and store the result', async () => {
    const fetchFn = jest.fn().mockResolvedValue(testValue);

    const result = await cache.get(testKey, fetchFn);
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(result).toBe(testValue);
    expect(cache._data.get(testKey)).toBe(testValue);
  });

  it('should return cached value if key is already in data', async () => {
    const fetchFn = jest.fn().mockResolvedValue(testValue);
    await cache.get(testKey, fetchFn); // Initial fetch
    const result = await cache.get(testKey, fetchFn); // Should return cached value

    expect(fetchFn).toHaveBeenCalledTimes(1); // Fetch function should only be called once
    expect(result).toBe(testValue);
    expect(cache._data.get(testKey)).toBe(testValue);
  });

  it('should clear the cache when clear is called', async () => {
    const fetchFn = jest.fn().mockResolvedValue(testValue);
    await cache.get(testKey, fetchFn);

    expect(cache._data.size).toBe(1); // Cache should have 1 entry after fetching

    cache.clear();
    expect(cache._data.size).toBe(0); // Cache should be empty after clear
  });
});
