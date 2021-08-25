/** 
 * User: ningxiao
 * 事件控制基类
 */
let count = 0;
let functions = {};
import Event from './Event';
class EventDispatcher {
    constructor() {
        this._events = {};
    };
    addEventListener(type, listener, useCapture, priority, useWeakReference) {
        count++;
        functions[count] = listener;
        if (this._events[type] && this._events[type].constructor === Array) {
            this._events[type].push(count);
        } else {
            this._events[type] = [count];
        };
        return count;
    };
    dispatchEvent(event) {
        if (event instanceof Event) {
            let list, playfunc;
            if (list = this._events[event.type]) {
                list.forEach((key) => {
                    if (playfunc = functions[key]) {
                        event._target = this;
                        playfunc.call(this, event);
                    };
                });
            };
        }
    };
    _release() {
        for (let key in this._events) {
            this.removeEventListener(key);
        };
        this._events = null;
    }
    hasEventListener(type) {
        return this._events[type] ? true : false;
    };
    removeEventListener(type) {
        let list;
        if (list = this._events[type]) {
            list.forEach((key) => {
                delete functions[key];
            });
        }
        delete this._events[type];
    };
    unlistenByKey(key) {
        if (key in functions) {
            functions[key] = null;
            delete functions[key];
        };
    }
}
export default EventDispatcher;