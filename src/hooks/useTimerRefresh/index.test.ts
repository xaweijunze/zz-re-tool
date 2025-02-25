import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useTimerRefresh from './index'; // 假设 Hook 文件路径

jest.useFakeTimers(); // 模拟计时器

describe('useTimerRefresh', () => {
  it('should call fetch initially if firstFlag is true', () => {
    const fetchMock = jest.fn();

    renderHook(() => useTimerRefresh({ fetch: fetchMock, firstFlag: true }));

    // 初始渲染时应该立即调用 fetch
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should not call fetch initially if firstFlag is false', () => {
    const fetchMock = jest.fn();

    renderHook(() => useTimerRefresh({ fetch: fetchMock, firstFlag: false }));

    // 初始渲染时不应该调用 fetch
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('should call fetch repeatedly based on record interval if openFlag is true', () => {
    const fetchMock = jest.fn();

    renderHook(() =>
      useTimerRefresh({ fetch: fetchMock, record: 3000, openFlag: true }),
    );

    // 初始渲染时调用一次 fetch
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // 快进到3000ms后，调用一次 fetch
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    // 再快进6000ms，总共应调用3次
    act(() => {
      jest.advanceTimersByTime(6000);
    });
    expect(fetchMock).toHaveBeenCalledTimes(4); // 初始1次 + 两个周期
  });

  it('should not call fetch repeatedly if openFlag is false', () => {
    const fetchMock = jest.fn();

    renderHook(() =>
      useTimerRefresh({ fetch: fetchMock, record: 3000, openFlag: false }),
    );

    // 初始渲染时调用一次 fetch
    expect(fetchMock).toHaveBeenCalledTimes(1);

    // 快进到3000ms后，fetch 不应再被调用
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should clear interval when unmounted', () => {
    const fetchMock = jest.fn();

    const { unmount } = renderHook(() =>
      useTimerRefresh({ fetch: fetchMock, record: 3000 }),
    );

    // 快进时间以模拟定时器运行
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    // 卸载 Hook，并确保定时器被清除
    unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // 确保定时器被清除后，不再调用 fetch
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
