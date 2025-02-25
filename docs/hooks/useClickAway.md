---
nav: hooks
group: DOM相关
title: useClickAway
mobile: false
---
# useClickAway

监听目标元素外的点击事件。

## 代码演示

### 基础用法

```tsx
import React, { useState, useRef } from 'react';
import { useClickAway } from 'zz-re-tool';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef(null);
  useClickAway(() => {
    setCounter((s) => s + 1);
  }, ref);

  return (
    <div>
      <button ref={ref} type="button">
        box
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
```

### 自定义 DOM

```tsx
import React, { useState } from 'react';
import { useClickAway } from 'zz-re-tool';

export default () => {
  const [counter, setCounter] = useState(0);

  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    () => document.getElementById('use-click-away-button'),
  );

  return (
    <div>
      <button type="button" id="use-click-away-button">
        box
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
```

### 支持多个 DOM 对象

```tsx
import React, { useState, useRef } from 'react';
import { useClickAway } from 'zz-re-tool';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  useClickAway(() => {
    setCounter((s) => s + 1);
  }, [ref1, ref2]);

  return (
    <div>
      <button type="button" ref={ref1}>
        box1
      </button>
      <button type="button" ref={ref2} style={{ marginLeft: 16 }}>
        box2
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
```

### 监听其它事件

```tsx
import React, { useState, useRef } from 'react';
import { useClickAway } from 'zz-re-tool';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef(null);
  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    ref,
    'contextmenu',
  );

  return (
    <div>
      <button ref={ref} type="button">
        box
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
```

### 支持多个事件

```tsx
import React, { useState, useRef } from 'react';
import { useClickAway } from 'zz-re-tool';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef(null);
  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    ref,
    ['click', 'contextmenu'],
  );

  return (
    <div>
      <button type="button" ref={ref}>
        box
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
```
### 支持 shadow DOM

```tsx
import React, { useState, useRef } from 'react';
import { useClickAway } from 'zz-re-tool';
import root from 'react-shadow';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef(null);
  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    ref,
    ['click', 'contextmenu'],
  );

  return (
    <root.div>
      <div>
        <button type="button" ref={ref}>
          box
        </button>
        <p>counter: {counter}</p>
      </div>
    </root.div>
  );
};
```
## API

```typescript
type Target = Element | (() => Element) | React.MutableRefObject<Element>;
type DocumentEventKey = keyof DocumentEventMap;

useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: Target | Target[],
  eventName?: DocumentEventKey | DocumentEventKey[]
);
```

### Params

| 参数        | 说明                         | 类型                                       | 默认值  |
| ----------- | ---------------------------- | ------------------------------------------ | ------- |
| onClickAway | 触发函数                     | `(event: T) => void`                       | -       |
| target      | DOM 节点或者 Ref，支持数组   | `Target` \| `Target[]`                     | -       |
| eventName   | 指定需要监听的事件，支持数组 | `DocumentEventKey` \| `DocumentEventKey[]` | `click` |
