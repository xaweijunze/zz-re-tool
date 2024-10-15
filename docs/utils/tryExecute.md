---
nav: utils
order: 5
title: tryExecute
mobile: false
---
# tryExecute

生成唯一键.

## 代码演示

```jsx
import React, { useState } from "react";
import { tryExecute } from "ww-zzhooks";
import _ from "lodash";

function App() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <div>
        <button onClick={handleOnClick}>获取数字小于等于5的值</button>
      </div>
      <div> 结果:{value} </div>
    </div>
  );
  function handleOnClick() {
    tryExecute(generate, catchFn)
  }
  function generate() {
    const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const target = _.sample(collection)
    if(target > 5) throw new Error('获取的数值大于5！')
    return setValue(target)
  }
  
  function catchFn(error) {
    setValue(error)
  }
}
export default App;

```

## API

```js
const result = tryExecute(callback, catchCallback)
```

## params

| 参数          | 说明                           | 类型     |
| ------------- | ------------------------------ | -------- |
| callback      | 需要进行错误捕获的函数         | Function |
| catchCallback | 捕获错误后，需要执行的回调函数 | Function |

## Result
| 参数   | 说明                   | 类型 |
| ------ | ---------------------- | ---- |
| result | callback的函数执行结果 | any  |

