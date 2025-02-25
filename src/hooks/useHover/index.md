---
nav:
  path: /hooks
---

# useHover

监听 DOM 元素是否有鼠标悬停。

## 代码演示

### 基础用法

```tsx
import React, { useRef } from 'react';
import { useHover } from 'zz-re-tool';

export default () => {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>;
};
```

### 传入 DOM 元素

```tsx
import React from 'react';
import { useHover } from 'zz-re-tool';

export default () => {
  const isHovering = useHover(() => document.getElementById('hover-div'), {
    onEnter: () => {
      console.log('onEnter');
    },
    onLeave: () => {
      console.log('onLeave');
    },
    onChange: (isHover) => {
      console.log('onChange', isHover);
    },
  });

  return <div id="hover-div">{isHovering ? 'hover' : 'leaveHover'}</div>;
};
```

## API

```javascript
const isHovering = useHover(target, {
  onEnter,
  onLeave,
  onChange,
});
```

### Params

| 参数    | 说明                  | 类型                                                        | 默认值 |
| ------- | --------------------- | ----------------------------------------------------------- | ------ |
| target  | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -      |
| options | 额外的配置项          | `Options`                                                   | -      |

### Options

| 参数     | 说明                 | 类型                            | 默认值 |
| -------- | -------------------- | ------------------------------- | ------ |
| onEnter  | hover 时触发         | `() => void`                    | -      |
| onLeave  | 取消 hover 时触发    | `() => void`                    | -      |
| onChange | hover 状态变化时触发 | `(isHovering: boolean) => void` | -      |

### Result

| 参数       | 说明                   | 类型      |
| ---------- | ---------------------- | --------- |
| isHovering | 鼠标元素是否处于 hover | `boolean` |
