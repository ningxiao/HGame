import Graphics from './Graphics';
import DisplayObject from './DisplayObject';
/**
 * User: ningxiao
 * Sprite 对象与MovieClip动画类似，但没有时间轴。Sprite 是不需要时间轴的对象的相应基类
 */
class Sprite extends DisplayObject {
    constructor() {
        super();
        this.stopDrag = false; //设置是否允许拖动
        this.useHandCursor = false; //布尔值，指示当鼠标滑过其 buttonMode 属性设置为 true 的 sprite 时是否显示手指形（手形光标）。
        this.buttonMode = false; //指定此 sprite 的按钮模式
        this.mouseEnabled = true; //指定此对象是否接收鼠标或其他用户输入、消息。
        this._numChildren = 0; //返回此对象的子项数目。
        this._graphics = new Graphics(); //指定属于此 sprite 的 Graphics 对象，在此 sprite 中可执行矢量绘图命令
    }
    /**
     * 返回对象绘制矢量
     * @require {Graphics}
     */
    get graphics() {
        return this._graphics;
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
    /**
     * 从显示列表中删除指定的 child DisplayObject 实例。
     * @param {DisplayObject} child 
     */
    removeChild(child) {
        if (child && child instanceof DisplayObject) {
            for (let i = 0, len = this.childList.length; i < len; i++) {
                if (this.childList[i] == child) {
                    this.childList.splice(i, 1);
                    this.child._release();
                    this._numChildren--;
                    break;
                };
            };
            return child;
        } else {
            console.log("当前对象没有继承DisplayObject")
        };
    }
}
export default Sprite;