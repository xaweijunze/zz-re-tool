---
nav:
  path: /hooks
---

# useEventTarget

常见表单控件(通过 e.target.value 获取表单值) 的 onChange 跟 value 逻辑封装，支持自定义值转换和重置功能。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import { useEventTarget } from 'zz-re-tool';

export default () => {
  const [value, { reset, onChange }] = useEventTarget({ initialValue: 'this is initial value' });

  return (
    <div>
      <input value={value} onChange={onChange} style={{ width: 200, marginRight: 20 }} />
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
};
```

### 自定义转换函数

```tsx
import React from 'react';
import { useEventTarget } from 'zz-re-tool';

export default () => {
  const [value, { onChange, reset }] = useEventTarget({
    initialValue: '',
    transformer: (val: string) => val.replace(/[^\d]/g, ''),
  });

  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        style={{ width: 200, marginRight: 20 }}
        placeholder="Please type here"
      />
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
};
```

## API

```typescript
const [value, { onChange, reset }] = useEventTarget<T, U>(Options<T, U>);
```

### Result

| 参数     | 说明                         | 类型                                    |
| -------- | ---------------------------- | --------------------------------------- |
| value    | 表单控件的值                 | `T`                                     |
| onChange | 表单控件值发生变化时候的回调 | `(e: { target: { value: T } }) => void` |
| reset    | 重置函数                     | `() => void`                            |

### Options

| 参数         | 说明                         | 类型              | 默认值 |
| ------------ | ---------------------------- | ----------------- | ------ |
| initialValue | 可选项, 初始值               | `T`               | -      |
| transformer  | 可选项，可自定义回调值的转化 | `(value: U) => T` | -      |
