---
nav:
  path: /hooks
---

# useMap

管理 Map 类型状态的 Hook。

## 代码演示

```tsx
import React from 'react';
import { useMap } from 'zz-re-tool';

export default () => {
  const [map, { set, setAll, remove, reset, get }] = useMap<string | number, string>([
    ['msg', 'hello world'],
    [123, 'number type'],
  ]);

  return (
    <div>
      <button type="button" onClick={() => set(String(Date.now()), new Date().toJSON())}>
        Add
      </button>
      <button
        type="button"
        onClick={() => setAll([['text', 'this is a new Map']])}
        style={{ margin: '0 8px' }}
      >
        Set new Map
      </button>
      <button type="button" onClick={() => remove('msg')} disabled={!get('msg')}>
        Remove 'msg'
      </button>
      <button type="button" onClick={() => reset()} style={{ margin: '0 8px' }}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>
    </div>
  );
};
```

## API

```typescript
const [map, { set, setAll, remove, reset, get }] = useMap<K, V>(initialValue);
```

### Result

| 参数   | 说明                  | 类型                                 |
| ------ | --------------------- | ------------------------------------ |
| map    | Map 对象              | `Map<K, V>`                          |
| set    | 添加元素              | `(key: K, value: V) => void`         |
| get    | 获取元素              | `(key: K) => V \| undefined`         |
| setAll | 生成一个新的 Map 对象 | `(newMap: Iterable<[K, V]>) => void` |
| remove | 移除元素              | `(key: K) => void`                   |
| reset  | 重置为默认值          | `() => void`                         |

### Params

| 参数         | 说明                        | 类型               | 默认值 |
| ------------ | --------------------------- | ------------------ | ------ |
| initialValue | 可选项，传入默认的 Map 参数 | `Iterable<[K, V]>` | -      |
