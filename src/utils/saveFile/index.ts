// saveFile.ts
import _ from 'lodash'

export default function saveFile(
  data: BlobPart,
  filename: string,
  mime: string = 'application/octet-stream',
  bom?: Uint8Array
): void {
  const blobData: BlobPart[] = bom ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime });

  // 兼容 Microsoft Edge 和 IE 的文件下载
  if (_.isFunction(_.get(window, 'navigator.msSaveBlob'))) {
    (window.navigator as any).msSaveBlob(blob, filename);
  } else {
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');

    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);

    // Safari 不支持 download 属性，因此使用 target="_blank"
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }

    document.body.appendChild(tempLink);
    tempLink.click();

    // 点击完成后清理临时链接
    setTimeout(() => {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 200);
  }
}
