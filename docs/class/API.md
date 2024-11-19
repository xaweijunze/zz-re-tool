---
nav: class
order: 6
title: API
mobile: false
---
# API

Axios封装类，旨在简化Axios配置.

## 代码演示

```jsx
import React, { useCallback, useState } from "react";
import { API } from "zz-re-tool";

const fetchNewsUrl = '/web_feed/getHotModuleList'
const api = new API('https://i.news.qq.com');

const defaultParams = {
  flush_num: 1,
  item_count: 20
}

function App() {
  return (
    <div>
      <div>
        <button onClick={setHeader} children={'设置请求头'} />
      </div>
      <div>
        <button onClick={removeHeader} children={'移除请求头'} />
      </div>
      <div>
        <button onClick={fetchNews} children={'发送接口'} />
      </div>
    </div>
  );
  async function setHeader(){
    api.setHeader('uuid', 'uuid')
  }
  async function removeHeader(){
    api.removeHeader('uuid')
  }
  async function fetchNews(){
    const res = await api.post(fetchNewsUrl, defaultParams)
  }
}
export default App;

```

## API

```js
const api = new API('https://i.news.qq.com', 5000);
api.post(fetchNewsUrl, defaultParams);
```

## params

| 参数    | 说明         | 类型   |
| ------- | ------------ | ------ |
| baseUrl | 基础请求地址 | string |
| timeOut | 请求超时时间 | number |

## Result(方法)

| 参数         | 说明                 | 类型                                                      |
| ------------ | -------------------- | --------------------------------------------------------- |
| get          | 动态方法，GET 请求   | `(url: string, params?: object): Promise<ApiResponse<T>>` |
| post         | 动态方法，POST 请求  | `(url: string, params?: object): Promise<ApiResponse<T>>` |
| put          | 动态方法，POST 请求  | `(url: string, params?: object): Promise<ApiResponse<T>>` |
| delete       | 动态方法，POST 请求  | `(url: string, params?: object): Promise<ApiResponse<T>>` |
| setHeader    | 动态方法，设置请求头 | `(name: string): void                                   ` |
| removeHeader | 动态方法，删除请求头 | `(name: string): void                                   ` |
| all          | 静态方法，           | `(requests: Promise<T>[]): Promise<T[]>                 ` |
| spread       | 静态方法，           | `(callback: (...args: T[]) => void): (arr: T[]) => void ` |
