/** 
 * User: ningxiao
 * Date: 17-12-10
 * 事件控制基类
 */
let count = 0;
let functions = {};
import Event from './Event';
class EventDispatcher {
    constructor() {
    };
    addEventListener(type, listener, useCapture, priority, useWeakReference) {
        count++;
        functions[count] = listener;
        if (this[type] && this[type].constructor === Array) {
            this[type].push(count);
        } else {
            this[type] = [count];
        };
        return count;
    };
    dispatchEvent(event) {
        if(event instanceof Event){
            let list, playfunc;
            if (list = this[event.type]) {
                list.forEach((key) => {
                    if (playfunc = functions[key]) {
                        event.target = this;
                        playfunc.call(this, event);
                    };
                });
            };
        }
    };
    hasEventListener(type) {
        return this[type] ? true : false;
    };
    removeEventListener(type) {
        let list;
        if (list = this[type]) {
            list.forEach((key) => {
                delete functions[key];
            });
        }
        delete this[type];
    };
    unlistenByKey(key) {
        if (key in functions) {
            functions[key] = null;
            delete functions[key];
        };
    }
}
export default EventDispatcher;