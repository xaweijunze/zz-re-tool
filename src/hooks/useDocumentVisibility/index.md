---
nav:
  path: /hooks
---

# useDocumentVisibility

监听页面是否可见，参考 [visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## 代码演示

### 基础用法

```tsx
import React, { useEffect } from 'react';
import { useDocumentVisibility } from 'zz-re-tool';

export default () => {
  const documentVisibility = useDocumentVisibility();

  useEffect(() => {
    console.log(`Current document visibility state: ${documentVisibility}`);
  }, [documentVisibility]);

  return <div>Current document visibility state: {documentVisibility}</div>;
};

```

## API

```typescript
const documentVisibility = useDocumentVisibility();
```

### Result

| 参数               | 说明                           | 类型                                               |
| ------------------ | ------------------------------ | -------------------------------------------------- |
| documentVisibility | 判断 document 是否处于可见状态 | `visible`\| `hidden` \| `prerender` \| `undefined` |
