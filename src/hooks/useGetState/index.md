---
nav:
  path: /hooks
---

# useGetState

给 `React.useState` 增加了一个 getter 方法，以获取当前最新值。

## 代码演示

### 基础用法

```tsx
import React, { useEffect } from 'react';
import { useGetState } from 'zz-re-tool';

export default () => {
  const [count, setCount, getCount] = useGetState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval count', getCount());
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <button onClick={() => setCount((count) => count + 1)}>count: {count}</button>;
};
```

## 类型定义

```typescript
import { Dispatch, SetStateAction } from 'react';
type GetStateAction<S> = () => S;

function useGetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];
function useGetState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];
```

## API

```typescript
const [state, setState, getState] = useGetState<S>(initialState);
```
