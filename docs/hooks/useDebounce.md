---
nav: hooks
group: 状态管理
title: useLatest
mobile: false
---

# useLatest

返回当前最新值的 Hook，可以避免闭包问题。

## 代码演示

### 基础用法

```jsx 
import React, { useState, useEffect } from 'react';
import { useLatest } from 'zz-re-tool';

export default () => {
  const [count, setCount] = useState(0);

  const latestCountRef = useLatest(count);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(latestCountRef.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>count: {count}</p>
    </>
  );
};

```

## API

```typescript
const latestValueRef = useLatest<T>(value: T): MutableRefObject<T>;
```
