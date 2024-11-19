---
nav: 类
order: 6
title: Cache
mobile: false
---
# Cache

统一管理数据.

## 代码演示

```jsx
import React, { useState } from "react";
import { Cache } from "zz-re-tool";

const keyEnums = {
  globalUrl: 'globalUrl',
}

const _cache = new Cache(keyEnums)

function App() {
  const [value, setValue] = useState(null)
  const [count, setCount] = useState(0)
  return (
    <div>
      <div>
        <button onClick={getCache} children={'获取数据'}/>
        <div>常量值:{value}</div>
        <button onClick={resetCache} children={'重置常量'}/>
        <div>常量请求次数:{count}</div>
      </div>
    </div>
  );

  async function getCache() {
    const res = await _cache.get(keyEnums.globalUrl, getGlobalUrl)
    setValue(res)
  }
  function resetCache() {
    _cache.clear()
    setValue(null)
  }
  async function getGlobalUrl() {
    setCount(x => ++x)
    return delayedFetch('/api')
  }
  function delayedFetch(value, delay = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value)
      }, delay)
    })
  }
}

export default App;

```

## API

```js
const _cache = new Cache(keyEnums)
_cache.get(key, fn);
```

## params

| 参数     | 说明                        | 类型   |
| -------- | --------------------------- | ------ |
| keyEnums | 常量名枚举（value不可重复） | Object |

## Result(方法)

| 参数  | 说明                 | 类型                              |
| ----- | -------------------- | --------------------------------- |
| get   | 动态方法，GET 请求   | `(key: string,fn: Function): any` |
| clear | 清空所有缓存中的常量 | `(void): void`                    |
