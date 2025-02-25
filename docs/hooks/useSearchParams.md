---
nav: hooks
group: 状态管理
title: useSearchParams
mobile: false
---

# useSearchParams

管理查询参数的 Hook.

## 代码演示

```jsx
import React from 'react'
import { useSearchParams } from "zz-re-tool";
function App() {
  const [params, actions] = useSearchParams({ date: new Date().toString() })
  
  return (
    <div >
        <button onClick={handleOnclick}>更新时间</button>
        {params?.date}
    </div>
  );
  function handleOnclick() {
    const newDate = new Date().toString()
    actions.set({date:newDate.toString()})
  }
}
export default App;
```

## API

```js
const [params, { set, assign, reset, setDefault }] = useSearchParams(initialParams)
```

## params

| 参数         | 说明         | 类型 |
| ------------ | ------------ | ---- |
| initialValue | 静态默认参数 | any  |

## Result

| 参数       | 说明             | 类型     |
| ---------- | ---------------- | -------- |
| set        | 更新查询参数     | function |
| assign     | 合并更新查询参数 | function |
| reset      | 重置查询参数     | function |
| setDefault | 设置默认查询参数 | function |

