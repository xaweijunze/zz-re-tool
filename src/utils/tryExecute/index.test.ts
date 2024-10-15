import tryExecute from './index';

describe('tryExecute', () => {
  let mockCallback: jest.Mock;
  let mockCatchCallback: jest.Mock;

  beforeEach(() => {
    mockCallback = jest.fn();
    mockCatchCallback = jest.fn();
  });

  it('should call the callback and return its result when no error occurs', async () => {
    const result = 'success';
    mockCallback.mockResolvedValue(result);

    const returnedValue = await tryExecute(mockCallback, mockCatchCallback);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(returnedValue).toBe(result);
    expect(mockCatchCallback).not.toHaveBeenCalled();
  });

  it('should call catchCallback with the correct error message when callback throws', async () => {
    const error = new Error('Something went wrong');
    mockCallback.mockRejectedValue(error);

    await tryExecute(mockCallback, mockCatchCallback);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCatchCallback).toHaveBeenCalledWith(
      'Something went wrong',
      error,
    );
  });

  it('should call the default openMessage function when catchCallback is not provided', async () => {
    // Mock console.error to test the default openMessage behavior
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const error = new Error('Default error');
    mockCallback.mockRejectedValue(error);

    await tryExecute(mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('Default error');

    consoleSpy.mockRestore(); // Restore original console.error behavior
  });

  it('should handle the case where the error has no message', async () => {
    const error = { someOtherProperty: 'no message' }; // Error object without a message
    mockCallback.mockRejectedValue(error);

    await tryExecute(mockCallback, mockCatchCallback);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCatchCallback).toHaveBeenCalledWith(undefined, error);
  });
});
