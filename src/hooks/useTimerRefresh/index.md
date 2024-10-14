# useTimerRefresh

函数轮询.

## 代码演示

```js
import React, { useCallback } from 'react';
import { useTimerRefresh } from 'ww-zzhooks';
function App() {
  const [result, setResult] = useState(0);
  const double = useCallback(
    () => setResult((result) => ++result),
    [setResult],
  );
  useTimerRefresh({
    fetch: double,
    record: 1000,
    firstFlag: true,
    openFlag: true,
  });
  return (
    <div>
      <div> result:{result} </div>
    </div>
  );
}
export default App;
```

## API

```js
useTimerRefresh({
  fetch: () => console.log(new Date().toString()),
  record: 1000,
  firstFlag: true,
  openFlag: true,
});
```

## params

| 参数      | 说明    | 类型     |
| --------- | ------------------ | -------- |
| fetch     | 必填项，需要轮询的函数                     | Function |
| record    | 默认 3000，轮询时间间隔，单位为毫秒             | Number   |
| firstFlag | 默认开启，首次是否调用 fetch，开启时： fetch - record - fetch - record - fetch ...；关闭时： record - fetch - record - fetch ... | Boolean  |
| openFlag  | 默认开启，开启标识，关闭时：停止轮询      | Boolean  |

## Result

无
