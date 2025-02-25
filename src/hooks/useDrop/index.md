---
nav:
  path: /hooks
---

# useDrop & useDrag

处理元素拖拽的 Hook。

> useDrop 可以单独使用来接收文件、文字和网址的拖拽。
>
> useDrag 允许一个 DOM 节点被拖拽，需要配合 useDrop 使用。
>
> 向节点内触发粘贴动作也会被视为拖拽。

## 代码演示

### 基础用法

```tsx
import React, { useRef, useState } from 'react';
import { useDrop, useDrag } from 'zz-re-tool';

const DragItem = ({ data }) => {
  const dragRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  useDrag(data, dragRef, {
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(false);
    },
  });

  return (
    <div
      ref={dragRef}
      style={{
        border: '1px solid #e8e8e8',
        padding: 16,
        width: 80,
        textAlign: 'center',
        marginRight: 16,
      }}
    >
      {dragging ? 'dragging' : `box-${data}`}
    </div>
  );
};

export default () => {
  const [isHovering, setIsHovering] = useState(false);

  const dropRef = useRef(null);

  useDrop(dropRef, {
    onText: (text, e) => {
      console.log(e);
      alert(`'text: ${text}' dropped`);
    },
    onFiles: (files, e) => {
      console.log(e, files);
      alert(`${files.length} file dropped`);
    },
    onUri: (uri, e) => {
      console.log(e);
      alert(`uri: ${uri} dropped`);
    },
    onDom: (content: string, e) => {
      alert(`custom: ${content} dropped`);
    },
    onDragEnter: () => setIsHovering(true),
    onDragLeave: () => setIsHovering(false),
  });

  return (
    <div>
      <div ref={dropRef} style={{ border: '1px dashed #e8e8e8', padding: 16, textAlign: 'center' }}>
        {isHovering ? 'release here' : 'drop here'}
      </div>

      <div style={{ display: 'flex', marginTop: 8 }}>
        {['1', '2', '3', '4', '5'].map((e, i) => (
          <DragItem key={e} data={e} />
        ))}
      </div>
    </div>
  );
};
```

### 自定义拖拽图像

```tsx
import React, { useRef } from 'react';
import { useDrag } from 'zz-re-tool';

const COMMON_STYLE: React.CSSProperties = {
  border: '1px solid #e8e8e8',
  height: '50px',
  lineHeight: '50px',
  padding: '16px',
  textAlign: 'center',
  marginRight: '16px',
};

export default () => {
  const dragRef = useRef(null);

  useDrag('', dragRef, {
    dragImage: {
      image: '/zz-re-tool/logo.png',
    },
  });

  return (
    <div ref={dragRef} style={{ display: 'flex' }}>
      <img style={COMMON_STYLE} src="/zz-re-tool/logo.png" />
      <div style={COMMON_STYLE}>drag me</div>
    </div>
  );
};
```

## API

### useDrag

```typescript
useDrag<T>(
  data: any,
  target: (() => Element) | Element | MutableRefObject<Element>,
  options?: DragOptions
);
```

#### Params

| 参数    | 说明                  | 类型                                                        | 默认值 |
| ------- | --------------------- | ----------------------------------------------------------- | ------ |
| data    | 拖拽的内容            | `any`                                                       | -      |
| target  | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -      |
| options | 额外的配置项          | `DragOptions`                                               | -      |

#### DragOptions

| 参数        | 说明                               | 类型                           | 默认值 |
| ----------- | ---------------------------------- | ------------------------------ | ------ |
| onDragStart | 开始拖拽的回调                     | `(e: React.DragEvent) => void` | -      |
| onDragEnd   | 结束拖拽的回调                     | `(e: React.DragEvent) => void` | -      |
| dragImage   | 自定义拖拽过程中跟随鼠标指针的图像 | `DragImageOptions`             | -      |

#### DragImageOptions

| 参数    | 说明                                                                                                                                                                                                                                       | 类型                | 默认值 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ------ |
| image   | 拖拽过程中跟随鼠标指针的图像。图像通常是一个 [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) 元素，但也可以是 [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) 或任何其他图像元素。 | `string \| Element` | -      |
| offsetX | 水平偏移                                                                                                                                                                                                                                   | `number`            | 0      |
| offsetY | 垂直偏移                                                                                                                                                                                                                                   | `number`            | 0      |

### useDrop

```typescript
useDrop<T>(
  target: (() => Element) | Element | MutableRefObject<Element>,
  options?: DropOptions
);
```

#### Params

| 参数    | 说明                  | 类型                                                        | 默认值 |
| ------- | --------------------- | ----------------------------------------------------------- | ------ |
| target  | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -      |
| options | 额外的配置项          | `DragOptions`                                               | -      |

#### DropOptions

| 参数        | 说明                           | 类型                                          | 默认值 |
| ----------- | ------------------------------ | --------------------------------------------- | ------ |
| onText      | 拖拽/粘贴文字的回调            | `(text: string, e: React.DragEvent) => void`  | -      |
| onFiles     | 拖拽/粘贴文件的回调            | `(files: File[], e: React.DragEvent) => void` | -      |
| onUri       | 拖拽/粘贴链接的回调            | `(text: string, e: React.DragEvent) => void`  | -      |
| onDom       | 拖拽/粘贴自定义 DOM 节点的回调 | `(content: any, e: React.DragEvent) => void`  | -      |
| onDrop      | 拖拽任意内容的回调             | `(e: React.DragEvent) => void`                | -      |
| onPaste     | 粘贴内容的回调                 | `(e: React.DragEvent) => void`                | -      |
| onDragEnter | 拖拽进入                       | `(e: React.DragEvent) => void`                | -      |
| onDragOver  | 拖拽中                         | `(e: React.DragEvent) => void`                | -      |
| onDragLeave | 拖拽出去                       | `(e: React.DragEvent) => void`                | -      |
