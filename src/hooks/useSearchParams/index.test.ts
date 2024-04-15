// useCustomHook.test.js
import { act, renderHook } from '@testing-library/react-hooks';
import useSearchParams from './index';

test('useSearchParams should setDefalutValue', () => {
  const { result } = renderHook(() => useSearchParams({ count: 0 }));

  expect(result.current[0].count).toBe(0);
});

test('useSearchParams should setValue', () => {
  const { result } = renderHook(() => useSearchParams({ count: 0 }));
  act(() => {
    result.current[1].set({ count: 1 });
  });
  expect(result.current[0].count).toBe(1);
});

test('useSearchParams should resetValue', () => {
  const { result } = renderHook(() => useSearchParams({ count: 0 }));
  act(() => {
    result.current[1].set({ count: 1 });
    result.current[1].reset();
  });
  expect(result.current[0].count).toBe(0);
});

test('useSearchParams should resetDefalutValue', () => {
  const { result } = renderHook(() => useSearchParams());
  act(() => {
    result.current[1].setDefault({ count: 1 });
  });
  expect(result.current[0].count).toBe(1);
});

test('useSearchParams should assignValue', () => {
  const { result } = renderHook(() => useSearchParams({ count: 0 }));
  act(() => {
    result.current[1].assign({ count: 1, number: 0 });
  });
  expect(result.current[0].count).toBe(1);
  expect(result.current[0].number).toBe(0);
});
