/**
 * @jest-environment jsdom
 */
// saveFile.test.ts
import saveFile from '.';

jest.useFakeTimers(); // 使用 Jest 的假定时钟
// 创建 mock
const createObjectURLMock = jest.fn();
const revokeObjectURLMock = jest.fn();
const appendChildMock = jest.fn();
const removeChildMock = jest.fn();
const clickMock = jest.fn();

// 使用 mock window 对象
beforeAll(() => {
  Object.defineProperty(window, 'URL', {
    value: {
      createObjectURL: createObjectURLMock,
      revokeObjectURL: revokeObjectURLMock,
    },
  });

  Object.defineProperty(document, 'createElement', {
    value: jest.fn().mockImplementation(() => {
      return {
        style: {},
        setAttribute: jest.fn(),
        click: clickMock,
      };
    }),
  });

  document.body.appendChild = appendChildMock;
  document.body.removeChild = removeChildMock;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('saveFile', () => {
  it('should create a Blob and trigger a file download', () => {
    const data = 'Hello, world!';
    const filename = 'test.txt';
    const mime = 'text/plain';

    saveFile(data, filename, mime);

    // 验证 Blob 被创建
    expect(createObjectURLMock).toHaveBeenCalled();

    // 验证创建的链接被点击
    expect(clickMock).toHaveBeenCalled();

    // 验证链接添加并随后从 DOM 中移除
    expect(appendChildMock).toHaveBeenCalled();

    expect(removeChildMock).not.toHaveBeenCalled(); // 在 setTimeout 之前不会调用
    expect(revokeObjectURLMock).not.toHaveBeenCalled(); // 在 setTimeout 之前不会调用

    // 运行所有的计时器
    jest.runAllTimers();

    // 现在应验证 removeChild 和 revokeObjectURL 被调用
    expect(removeChildMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
  });

  it('should set the download attribute when supported', () => {
    const mockElement = {
      style: {},
      setAttribute: jest.fn(),
      click: clickMock,
      download: '',
    };

    (document.createElement as jest.Mock).mockReturnValue(mockElement);

    saveFile('data', 'test.txt');

    expect(mockElement.setAttribute).toHaveBeenCalledWith(
      'download',
      'test.txt',
    );
    expect(mockElement.setAttribute).not.toHaveBeenCalledWith(
      'target',
      '_blank',
    );
  });

  it('should set target="_blank" if download attribute is unsupported', () => {
    const mockElement = {
      style: {},
      setAttribute: jest.fn(),
      click: clickMock,
    };

    (document.createElement as jest.Mock).mockReturnValue(mockElement);
    saveFile('data', 'test.txt');

    expect(mockElement.setAttribute).toHaveBeenCalledWith('target', '_blank');
  });

  it('should use msSaveBlob for IE/Edge compatibility', () => {
    const msSaveBlobMock = jest.fn();
    (window.navigator as any).msSaveBlob = msSaveBlobMock;

    saveFile('data', 'test.txt');
    expect(msSaveBlobMock).toHaveBeenCalled();

    delete (window.navigator as any).msSaveBlob;
  });
});
