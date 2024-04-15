// useCustomHook.test.js
import { act, renderHook } from '@testing-library/react-hooks';
import useOpenInfo from './index';

test('useOpenInfo should setDefalutValue', () => {
  const { result } = renderHook(() => useOpenInfo({ type: null, data: null }));

  expect(result.current.openInfo.type).toBe(null);
  expect(result.current.openInfo.data).toBe(null);
});

test('useOpenInfo should setValue', () => {
  const { result } = renderHook(() => useOpenInfo({ type: null, data: null }));
  act(() => {
    result.current.setOpenInfo({ type: 'edit', data: 'openInfo' });
  });
  expect(result.current.openInfo.type).toBe('edit');
  expect(result.current.openInfo.data).toBe('openInfo');
});

test('useOpenInfo should close', () => {
  const { result } = renderHook(() => useOpenInfo({ type: null, data: null }));
  act(() => {
    result.current.close();
  });
  expect(result.current.openInfo.type).toBe(undefined);
  expect(result.current.openInfo.data).toBe(undefined);
});
