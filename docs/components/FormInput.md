---
nav: component
order: 5
title: FormInput
mobile: false
---
# FormInput

封装的表单输入项.

## 代码演示

```jsx
import React, { useCallback, useState } from "react";
import { FormInput } from "zz-re-tool";
import { Form, Input, Button } from "antd";
function App() {
  const [value, setValue] = useState({});
  return (
    <>
      <Form onFinish={onFinish}>
        <FormInput label="名称" name={'name'} Component={Input} />
        <FormInput componentProps={{ type:"primary", htmlType:"submit", children:'Submit' }} Component={Button} />
      </Form>
      <div>Name:{value?.name}</div>
    </>
  );
  function onFinish(o){
    setValue(o)
  }
}
export default App;
```

## API

```js
<FormInput componentProps={{ type:"primary", htmlType:"submit", children:'Submit' }} Component={Button} />
```

## params

| 参数           | 说明                                                   | 类型   |
| -------------- | ------------------------------------------------------ | ------ |
| ...            | 继承antd中FormItem的所有参数                           | Object |
| componentProps | 内容组件的参数，继承继承antd中使用的内容组件的所有参数 | Object |

## Result

组件

