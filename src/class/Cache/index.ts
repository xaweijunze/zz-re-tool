import _ from 'lodash';

class Cache {
  private _data: any;
  private _keyEnums: any;
  constructor(keyEnums: Object) {
    this._data = new Map();
    this._keyEnums = new Map(Object.entries(keyEnums));
  }

  async get(key: string, fetchFn: Function) {
    if (!this._keyEnums.has(key))
      throw new Error(`请将${key}添加到构造枚举中统一管理！`);
    if (!_.isFunction(fetchFn)) throw new Error(`无法获取${key}值！`);
    if (!this._data.has(key)) {
      const value = await fetchFn();
      this._data.set(key, value);
    }
    return this._data.get(key);
  }
  clear() {
    this._data = new Map();
  }
}

export default Cache;
