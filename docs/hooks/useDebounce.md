---
nav: hooks
group: 性能优化
title: useDebounce
mobile: false
---

# useDebounce

用于防抖处理的 Hook，适合在输入、滚动、窗口大小变化等频繁触发的场景下，减少不必要的渲染或操作。

## 代码演示

### 基础用法

```tsx 
import React, { useState } from 'react';
import { useDebounce } from 'zz-re-tool';

function App() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, { wait: 500 });

  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="输入内容 (500ms 防抖)"
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}
export default App;
```

## API

```typescript
const debouncedValue = useDebounce(value, options);
```
