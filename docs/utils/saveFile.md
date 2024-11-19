---
nav: utils
order: 5
title: saveFile
mobile: false
---
# saveFile

下载二进制文件.

## 代码演示

```jsx
import React, { useState } from "react";
import { saveFile } from "zz-re-tool";
import _ from "lodash";

function App() {
  return (
    <div>
      <div>
        <button onClick={handleOnClick}>下载文件</button>
      </div>
    </div>
  );
  
  function handleOnClick() {
    const data = "Hello, world!";
    const blobData = new TextEncoder().encode(data);  // 将字符串转换为二进制数据
    saveFile(blobData, 'hello.txt', 'text/plain');
  }
}
export default App;

```

## API

```js
saveFile(blobData, fileName, mime)
```

## params

| 参数     | 说明       | 类型     |
| -------- | ---------- | -------- |
| blobData | 二进制数据 | BlobPart |
| fileName | 下载文件名 | string   |
| mime     | 文件类型   | string   |

## Result

无

