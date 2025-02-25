---
nav:
  path: /hooks
---

# useSet

管理 Set 类型状态的 Hook。

## 代码演示

```tsx
import React from 'react';
import { useSet } from 'zz-re-tool';

export default () => {
  const [set, { add, remove, reset }] = useSet(['Hello']);

  return (
    <div>
      <button type="button" onClick={() => add(String(Date.now()))}>
        Add Timestamp
      </button>
      <button
        type="button"
        onClick={() => remove('Hello')}
        disabled={!set.has('Hello')}
        style={{ margin: '0 8px' }}
      >
        Remove Hello
      </button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
      </div>
    </div>
  );
};
```

## API

```typescript
const [set, { add, remove, reset }] = useSet<K>(initialValue);
```

### Result

| 参数   | 说明         | 类型               |
| ------ | ------------ | ------------------ |
| set    | Set 对象     | `Set<K>`           |
| add    | 添加元素     | `(key: K) => void` |
| remove | 移除元素     | `(key: K) => void` |
| reset  | 重置为默认值 | `() => void`       |

### Params

| 参数         | 说明                        | 类型          | 默认值 |
| ------------ | --------------------------- | ------------- | ------ |
| initialValue | 可选项，传入默认的 Set 参数 | `Iterable<K>` | -      |
