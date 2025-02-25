---
nav:
  path: /hooks
---

# usePrevious

保存上一次状态的 Hook。

## 代码演示

### 基础用法

```tsx
import { usePrevious } from 'zz-re-tool';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);
  return (
    <>
      <div>counter current value: {count}</div>
      <div style={{ marginBottom: 8 }}>counter previous value: {previous}</div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        increase
      </button>
      <button type="button" style={{ marginLeft: 8 }} onClick={() => setCount((c) => c - 1)}>
        decrease
      </button>
    </>
  );
};
```
## API

```typescript
const previousState: T = usePrevious<T>(
  state: T,
  shouldUpdate?: (prev: T | undefined, next: T) => boolean
);
```

### Result

| 参数          | 说明            | 类型 |
| ------------- | --------------- | ---- |
| previousState | 上次 state 的值 | `T`  |

### Params

| 参数         | 说明                       | 类型                                         | 默认值                       |
| ------------ | -------------------------- | -------------------------------------------- | ---------------------------- |
| state        | 需要记录变化的值           | `T`                                          | -                            |
| shouldUpdate | 可选，自定义判断值是否变化 | `(prev: T \| undefined, next: T) => boolean` | `(a, b) => !Object.is(a, b)` |
