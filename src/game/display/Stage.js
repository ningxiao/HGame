import Engine from '../engine';
import Device from '../events/Device';
import DisplayObject from '../display/DisplayObject';

/**
 * User: ningxiao
 * Stage 类代表主绘图区
 */
class Stage extends DisplayObject {
    constructor(canvas, engine) {
        super();
        this._canvas = canvas;
        this._stage = this;
        this._numChildren = 0; //返回此对象的子项数目。
        this.device = new Device(this);
        this.engine = Engine(canvas, engine); //绘制引擎可以切换webgl svg dom 等三类元素
        this.exitFrame();
    }
    /**
     * 返回此对象的子项数目
     * @return{Int}
     */
    get numChildren() {
        return this._numChildren;
    }
    /**
     * 将一个 DisplayObject 子实例添加到该 Sprite 实例中。
     * @param {DisplayObject} child 
     * @return {DisplayObject} child 
     */
    addChild(child) {
        if (child instanceof DisplayObject) {
            child.parent = this;
            child.zIndex = this.zMax;
            child.activation(); //激活挂载
            this.zMax++;
            this._numChildren++;
            this.childList.push(child);
            this._sortZindex();
        };
    }
    enterFrame() {

    }
    exitFrame() {
        this.enterFrame();
        this.engine.clearRect();
        this.engine.drawMouse(this.getObjectsUnderPoint(this.device.mouseX, this.device.mouseY));
        for (let i = this.childList.length - 1; i >= 0; i--) {
            let child = this.childList[i];
            if (child && child.visible) {
                child.exitFrame(this.engine);
            };
        };
        window.requestAnimationFrame(this.exitFrame.bind(this));
    }
}
export default Stage;