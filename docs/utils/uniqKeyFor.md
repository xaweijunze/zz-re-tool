---
nav: utils
order: 5
title: uniqKeyFor
mobile: false
---
# uniqKeyFor

生成唯一键.

## 代码演示

```jsx
import React, { useState } from "react";
import { uniqKeyFor } from "zz-re-tool";
function App() {
  const [uniqKey, setUniqKey] = useState([uniqKeyFor()]);
  return (
    <div>
      <div>
        <button onClick={() => setUniqKey(uniqKeyFor())}>生成唯一key</button>
      </div>
      <div> uniqKey:{uniqKey} </div>
    </div>
  );
}
export default App;

```

## API

```js
uniqKeyFor()
```

## params

无

## Result
| 参数    | 说明                | 类型   |
| ------- | ------------------- | ------ |
| uniqKey | 返回生成的唯一key值 | string |

