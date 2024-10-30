---
nav: hooks
order: 5
title: useOpenInfo
mobile: false
---
# useOpenInfo

管理状态展示的 Hook.

## 代码演示

```jsx
import React from 'react'
import { useOpenInfo } from "ww-zzhooks";
function App() {
  const {openInfo, setOpenInfo, close} = useOpenInfo({ type: null, data: null })
  
  return (
    <div>
        <button onClick={handleOnclick}>展示时间</button>
        <button onClick={close}>隐藏时间</button>
        {openInfo?.type === 'date' && <span>{openInfo?.data}</span>}
    </div>
  );
  function handleOnclick() {
    const newDate = new Date().toString()
    setOpenInfo({ type:'date', data:newDate.toString() })
  }
}
export default App;
```

## API

```js
const {openInfo, setOpenInfo, close} = useOpenInfo(initialParams)
```

## params

| 参数         | 说明         | 类型 |
| ------------ | ------------ | ---- |
| initialValue | 静态默认参数 | any  |

## Result

| 参数        | 说明     | 类型     |
| ----------- | -------- | -------- |
| openInfo    | 当前状态 | 传入类型 |
| setOpenInfo | 更新状态 | function |
| close       | 清空状态 | function |

