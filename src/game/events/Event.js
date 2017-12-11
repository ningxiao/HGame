/**
 * User: ningxiao
 * Date: 17-12-10
 * 模拟的 DOM 事件模型体系，以实现虚拟对象事件响应体系
 */
class Event {
    constructor(type) {
        this.target;
        this.type = type;
    }
    /**
     * 舞台帧频事件
     * @return {String} 
     */
    static get ENTERFRAME() {
        return 'enterFrame'
    }
    /**
     * 对象被挂载舞台激活派发时间
     * @return {String} 
     */
    static get ADDED() {
        return 'added';
    }
    /**
     * 对象取消挂载被舞台清除
     * @return {String} 
     */
    static get REMOVED() {
        return 'removed';
    }
}
export default Event;