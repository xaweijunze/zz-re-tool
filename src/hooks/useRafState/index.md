---
nav:
  path: /hooks
---

# useRafState

只在 [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) callback 时更新 state，一般用于性能优化。

## 代码演示

### 基础用法

```tsx
/**
 * title: 基础用法
 */

import { useRafState } from 'zz-re-tool';
import React, { useEffect } from 'react';

export default () => {
  const [state, setState] = useRafState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onResize = () => {
      setState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };
    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div>
      <p>Try to resize the window </p>
      current: {JSON.stringify(state)}
    </div>
  );
};

```

### API

与 `React.useState` 一致
