---
nav: hooks
group: 函数处理
title: useMemoizedFn
mobile: false
---

# useMemoizedFn

优化函数的引用，确保函数不会在每次渲染时重新创建。

## 代码演示

```jsx
import React, { useState, useEffect } from 'react';
import { useMemoizedFn } from 'zz-re-tool';

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered!");
  return (
    <button onClick={onClick}>Click me!</button>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const time = new Date()
  // 使用 useMemoizedFn 保证 onClick 不会在每次父组件重新渲染时被重新创建
  const handleClick = useMemoizedFn(() => {
    setCount(prevCount => prevCount + 1);
  });
  // 会触发子组件重载
  const handleClickn = () => {
    setCount(prevCount => prevCount + 1);
  }
  return (
    <div>
      <h1>Count: {count}</h1>
      {/* 将优化后的函数传递给子组件 */}
      <Child onClick={handleClick} />
      <Child onClick={handleClickn} />
    </div>
  );
}

export default App;
```

## API

```js
const memoizedFn = useMemoizedFn(fn)
```

## params

| 参数         | 说明         | 类型 |
| ------------ | ------------ | ---- |
| fn | 需要被优化的函数 | function  |

## Result

| 参数        | 说明     | 类型     |
| ----------- | -------- | -------- |
| memoizedFn    | 优化后的函数 | function |

