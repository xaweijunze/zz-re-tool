# useAutoRefresh

监听函数，自动执行.

## 代码演示

```js
import React, { useCallback, useState } from "react";
import { useAutoRefresh } from "ww-zzhooks";
function App() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(0);
  const double = useCallback(() => setResult(count * 2), [count, setResult]);
  useAutoRefresh(double);
  return (
    <div>
      <div>
        count: <input value={count} onChange={(e) => setCount(e.target.value)} />
      </div>
      <div> result:{result} </div>
    </div>
  );
}
export default App;

```

## API

```js
useAutoRefresh(callback)
```

## params

| 参数     | 说明                                               | 类型     |
| -------- | -------------------------------------------------- | -------- |
| callback | 监听函数，需要是 cachedFn 函数，否则会无限循序执行 | Function |

## Result

无
