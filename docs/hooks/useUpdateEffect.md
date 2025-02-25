---
nav: hooks
group: 状态管理
title: useUpdateEffect
mobile: false
---

# useUpdateEffect

用于在 React 组件更新时执行副作用，类似于 `useEffect`，但它会在组件**更新**时触发，而不是在初次渲染时触发。

## 代码演示

```jsx
import React, { useState } from 'react';
import { useUpdateEffect } from 'zz-re-tool';

function App() {
  const [count, setCount] = useState(0);

  // 使用 useUpdateEffect 仅在 count 更新时触发
  useUpdateEffect(() => {
    console.log('Count has been updated:', count);
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
```


## API

```jsx | pure
const useUpdateEffect = createUpdateEffect(useEffect);
```

## params

| 参数         | 说明         | 类型 |
| ------------ | ------------ | ---- |
| effect | 触发的副作用回调	 | function  |
| deps | 依赖项数组	 | array  |

## Result

useUpdateEffect 并没有返回值，只有副作用回调会在组件更新时被触发。

## 注

useUpdateEffect 是通过 createUpdateEffect 创建的，它实际上是 useEffect 的一个改进版本，能确保副作用只在组件更新后触发，而不是在首次渲染时。
通过 useRef 维护一个标志位 isMounted，用来判断是否是组件的首次渲染。这样，只有在组件更新时副作用才会被调用，避免了首次渲染时副作用的执行。
