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
        this.mouseY = 0; 
        this.mouseX = 0; 
        this.stage = stage;
        this.stage._canvas.addEventListener(MouseEvent.CLICK, this.mouseclick.bind(this));
        this.stage._canvas.addEventListener(MouseEvent.MOUSE_MOVE, this.mousemove.bind(this));
    }
    mousemove(ev){
        let target =  this.stage.getObjectsUnderPoint(ev.offsetX, ev.offsetY,true);
        this.mouseY = ev.offsetY; 
        this.mouseX = ev.offsetX; 
        if(target.hasEventListener(MouseEvent.MOUSE_MOVE)){
            target.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_MOVE, ev.offsetX, ev.offsetY));
        }
    }
    mouseclick(ev) {
        let target =  this.stage.getObjectsUnderPoint(ev.offsetX, ev.offsetY,true);
        if(target.hasEventListener(MouseEvent.CLICK)){
            target.dispatchEvent(new MouseEvent(MouseEvent.CLICK, ev.offsetX, ev.offsetY));
        }
    }
}
export default Device;