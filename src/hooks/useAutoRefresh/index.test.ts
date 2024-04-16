import { renderHook } from '@testing-library/react-hooks';
import { useCallback, useState } from 'react';
import useAutoRefresh from './index';

test('useAutoRefresh should firstUpdate', () => {
  const { result: status } = renderHook(() => useState(1));
  const { result: update } = renderHook(() =>
    useCallback(
      () => status.current[1](++status.current[0]),
      [status.current[0]],
    ),
  );
  renderHook(() => useAutoRefresh(update.current));
  expect(status.current[0]).toBe(2);
});
