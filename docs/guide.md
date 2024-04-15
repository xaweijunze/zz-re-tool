# 快速开始

## 快速入门

首先用你喜欢的软件包管理工具来安装 ww-zzhooks：

```bash
npm install ww-zzhooks
# 或
yarn add ww-zzhooks
```

使用：

```js
// src/App.js
import React from 'react'
import { useSearchParams } from "ww-zzhooks";
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