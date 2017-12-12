import Event from './Event';
/**
 * 每次发生鼠标事件时，都会将 MouseEvent 对象调度到事件流中
 * User: ningxiao
 * Date: 17-12-12
 */
class MouseEvent extends Event {
    constructor(type, stageX = 0, stageY = 0) {
        super(type);
        this._localX = 0;
        this._localY = 0;
        this._stageX = stageX;
        this._stageY = stageY;
    }
    get stageX() {
        return this._stageX;
    }
    get stageY() {
        return this._stageY;
    }
    get localX() {
        return this._localX;
    }
    get localY() {
        return this._localY;
    }
    static get CLICK() {
        return 'click';
    }
    static get MOUSE_DOWN() {
        return 'mouseDown';
    }
    static get MOUSE_UP() {
        return 'mouseUp';
    }
    static get MOUSE_WHEEL() {
        return 'mouseWheel';
    }
    static get MOUSE_MOVE() {
        return 'MOUSE_MOVE';
    }
    static get MOUSE_OUT() {
        return 'mouseOut';
    }
    static get MOUSE_OVER() {
        return 'mouseOver';
    }
}
export default MouseEvent;