import Event from './Event';
import MouseEvent from './MouseEvent';
import EventDispatcher from './EventDispatcher';
/**
 * 输入设备平台化判断区分移动端或者pc端或者外控制websocket通讯
 * User: ningxiao
 * Date: 17-12-12
 */
class Device extends EventDispatcher {
    constructor(stage) {
        super();
        this.stage = stage;
        this.stage._canvas.addEventListener(MouseEvent.CLICK, this.mouseclick.bind(this));
    }
    mouseclick(ev) {
        let target =  this.stage.getObjectsUnderPoint(ev.offsetX, ev.offsetY);
        if(target.hasEventListener(MouseEvent.CLICK)){
            target.dispatchEvent(new MouseEvent(MouseEvent.CLICK, ev.offsetX, ev.offsetY));
        }
    }
}
export default Device;