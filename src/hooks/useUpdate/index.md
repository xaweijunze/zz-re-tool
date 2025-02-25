---
nav:
  path: /hooks
---

# useUpdate

useUpdate 会返回一个函数，调用该函数会强制组件重新渲染。

## 代码演示

### 基础用法

```js
import React from 'react';
import { useUpdate } from 'zz-re-tool';

export default () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <button type="button" onClick={update} style={{ marginTop: 8 }}>
        update
      </button>
    </>
  );
};
```

## API

```typescript
const update = useUpdate();
```
