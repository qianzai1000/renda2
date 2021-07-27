class EventCenter {
  // 存储事件
  handlers = {}

  /**
   * 添加事件
   * @param {String} type 事件名称
   * @param {Function} handler 监听函数，只能传Function
   * @param {Boolean} isOnce 是否只执行一次
   * @param {String} childType 子事件名称
   */
  _addHandler(type, handler, isOnce, childType='') {
    if (!type || !handler || typeof handler !== 'function') {
      return;
    }
    this.handlers[type] = this.handlers[type] || [];
    // if (this.handlers[type].findIndex(item => item.handler === handler) < 0) { // 避免重复添加
    //   this.handlers[type].push({ handler, isOnce, childType }); // 存储的是对象
    // }
    if (this.handlers[type].findIndex(item => item.childType === childType) < 0) { // 避免重复添加
      this.handlers[type].push({ handler, isOnce, childType }); // 存储的是对象
    }
  }

  /**
   * 监听事件
   * @param {String} type 事件名称
   * @param {Function} handler 监听函数
   * @param {String} childType 子事件名称
   */
  on(type, handler, childType) {
    this._addHandler(type, handler, false, childType);
  }

  /**
   * 只执行一次
   * @param {String} type 事件名称
   * @param {Function} handler 监听函数
   * @param {String} childType 子事件名称
   */
  once(type, handler, childType) {
    this._addHandler(type, handler, true, childType);
  }

  /**
   * 触发事件
   * @param {String} type 事件名称
   * @param {*} params 参数
   */
  emit(type, ...params) {
    if (!(type in this.handlers)) { // 为注册该事件
      return;
    }
    this.handlers[type].forEach(handler => {
      if (handler) {
        handler.handler.call(this, ...params);
        if (handler.isOnce) { // once监听时，删除订阅事件
          this.off(type, handler.handler);
        }
      }
    });
  }

  /**
   * 事件移除-若无第二个参数则删除该事件名称
   * @param {String} type 事件名称
   * @param {String} childType 子事件名称
   */
  off(type, childType) {
    if (!(type in this.handlers)) { // 为注册该事件
      return;
    }
    if (!childType) { // 无第二个参数，直接移除事件
      delete this.handlers[type];
    } else {
      const idx = this.handlers[type].findIndex(ele => ele && ele.childType === childType);
      if (!(idx >= 0)) {
        return;
      }
      this.handlers[type].splice(idx, 1); // 移除事件
    }
  }

  /**
   * 全部清空
   */
  clear() {
    this.handlers = {};
  }
}
export default new EventCenter();
