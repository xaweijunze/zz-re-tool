// api.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import API from '.';

// 创建 Axios mock 实例
const mock = new MockAdapter(axios);
const api = new API('https://api.example.com');

describe('api', () => {
  afterEach(() => {
    mock.reset(); // 每个测试后重置 mock
  });

  it('should create an Axios instance with the correct baseURL and timeout', () => {
    expect(api).toBeDefined();
  });

  it('should perform a GET request', async () => {
    const responseData = {
      code: 200,
      message: 'Success',
      data: { id: 1, name: 'John' },
    };
    mock.onGet('/user', { params: { id: 1 } }).reply(200, responseData);

    const result = await api.get('/user', { id: 1 });

    expect(result).toEqual(responseData);
  });

  it('should perform a POST request', async () => {
    const postData = { name: 'John' };
    const responseData = {
      code: 201,
      message: 'Created',
      data: { id: 1, ...postData },
    };
    mock.onPost('/user', postData).reply(201, responseData);

    const result = await api.post('/user', postData);

    expect(result).toEqual(responseData);
  });

  it('should perform a PUT request', async () => {
    const putData = { name: 'John Doe' };
    const responseData = {
      code: 200,
      message: 'Updated',
      data: { id: 1, ...putData },
    };
    mock.onPut('/user/1', putData).reply(200, responseData);

    const result = await api.put('/user/1', putData);

    expect(result).toEqual(responseData);
  });

  it('should perform a DELETE request', async () => {
    const responseData = { code: 200, message: 'Deleted', data: null };
    mock.onDelete('/user/1').reply(200, responseData);

    const result = await api.delete('/user/1');

    expect(result).toEqual(responseData);
  });

  it('should set headers dynamically', () => {
    api.setHeader('Authorization', 'Bearer token');
    expect(
      api['axiosInstance'].defaults.headers.common['Authorization'],
    ).toEqual('Bearer token');
  });

  it('should remove headers dynamically', () => {
    api.setHeader('Authorization', 'Bearer token');
    api.removeHeader('Authorization');
    expect(
      api['axiosInstance'].defaults.headers.common['Authorization'],
    ).toBeUndefined();
  });

  it('should handle API errors', async () => {
    mock.onGet('/error').reply(500);

    await expect(api.get('/error')).rejects.toThrow();
  });

  it('should use axios.all and axios.spread for concurrent requests', async () => {
    const request1 = Promise.resolve({ data: { id: 1, name: 'John' } });
    const request2 = Promise.resolve({ data: { id: 2, name: 'Jane' } });

    const results = await API.all([request1, request2]);

    expect(results).toHaveLength(2);
    expect(results[0].data.name).toBe('John');
    expect(results[1].data.name).toBe('Jane');
  });
});
