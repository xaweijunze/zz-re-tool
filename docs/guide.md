# 快速开始

## 快速入门

首先用你喜欢的软件包管理工具来安装 zz-re-tool：

```bash
npm install zz-re-tool
# 或
yarn add zz-re-tool
```

使用：

```js
// src/App.js
import React from 'react'
import { useSearchParams } from 'zz-re-tool';
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
