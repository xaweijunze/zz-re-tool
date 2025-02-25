---
nav:
  path: /hooks
---

# useSize

监听 DOM 节点尺寸变化的 Hook。

## 代码演示

### 基础用法

```tsx
import React, { useRef } from 'react';
import { useSize } from 'zz-re-tool';

export default () => {
  const ref = useRef(null);
  const size = useSize(ref);
  return (
    <div ref={ref}>
      <p>Try to resize the preview window </p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
};
```
### 传入 DOM 节点

```tsx
import React from 'react';
import { useSize } from 'zz-re-tool';

export default () => {
  const size = useSize(document.querySelector('body'));
  return (
    <div>
      <p>Try to resize the preview window </p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
};
```
## API

```typescript
const size = useSize(target);
```

### Params

| 参数   | 说明             | 类型                                                          | 默认值 |
| ------ | ---------------- | ------------------------------------------------------------- | ------ |
| target | DOM 节点或者 ref | `Element` \| `(() => Element)` \| `MutableRefObject<Element>` | -      |

### Result

| 参数 | 说明           | 类型                                             | 默认值                                                                    |
| ---- | -------------- | ------------------------------------------------ | ------------------------------------------------------------------------- |
| size | DOM 节点的尺寸 | `{ width: number, height: number } \| undefined` | `{ width: target.clientWidth, height: target.clientHeight } \| undefined` |
