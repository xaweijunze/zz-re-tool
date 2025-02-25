---
nav:
  path: /hooks
---

# useMount

只在组件初始化时执行的 Hook。

## 代码演示

### 基础用法

```tsx
import { useMount, useBoolean } from 'zz-re-tool';
import { message } from 'antd';
import React from 'react';

const MyComponent = () => {
  useMount(() => {
    message.info('mount');
  });

  return <div>Hello World</div>;
};

export default () => {
  const [state, { toggle }] = useBoolean(false);

  return (
    <>
      <button type="button" onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
```

## API

```typescript
useMount(fn: () => void);
```

### 参数

| 参数 | 说明               | 类型         | 默认值 |
| ---- | ------------------ | ------------ | ------ |
| fn   | 初始化时执行的函数 | `() => void` | -      |
