import Point from '../geom/Point';
import Rectangle from '../geom/Rectangle';
import EventDispatcher from '../events/EventDispatcher';
/**
 * User: ningxiao
 * Date: 17-12-10
 * DisplayObject显示对象的基类。
 */
class DisplayObject extends EventDispatcher {
    constructor() {
        super();
        this._x = 0;//表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。        
        this._y = 0;//表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。
        this.z = 0;//使用webgl渲染引擎使用
        this.mask = false;//是否使用遮罩对象DisplayObject
        this.width = 0;//宽度
        this.height = 0;//高度
        this.bitmap = null;//
        this.mouseX = 0;
        this.mouseY = 0;
        this.zMax = 0;//当前最大层
        this.zIndex = 0;//当前对象层级关系
        this.childList = [];//对象包含子节点元素集合
        this.centerX = 0;//注册中心点X
        this.centerY = 0;//注册中心点Y
        this.parent = null;//父级对象
        this.rotation = 0;//旋转角度
        this.alpha = 1;//透明度
        this.transform = null;//一个对象，具有与显示对象的矩阵、颜色转换和像素范围有关的属性。
        this.visible = true;//显示对象是否可以见
        this.cacheAsBitmap = false; //是否使用BitmapData缓存数据 
        this._stage = null;//舞台渲染对象
        this._global_x = 0;//相对与舞台的坐标系 x轴
        this._global_y = 0;//相对与舞台的坐标系 y轴
        this._global_rect = new Rectangle();
    }
    get globalX(){
        return this._global_x;
    }
    get globalY(){
        return this._global_y;
    }
    get stage(){
        return this._stage;
    }
    get x(){
        return this._x;
    }
    set x(x){
        this._x +=x;
        this.activation();
    }
    get y(){
        return this._y;
    }
    set y(y){
        this._y +=y;
        this.activation();
    }
    _sortZindex() {
        let key = 'zIndex';
        let len = this.childList.length;
        if (len > 1) {
            this.childList.sort((v1, v2) => {
                return v2[key] - v1[key];
            });
        };
    };
    /**
     * 返回一个矩形，该矩形根据 targetCoordinateSpace 参数定义的坐标系定义显示对象的边界
     * @param {DisplayObject} targetCoordinateSpace 
     * @return {Rectangle} 
     */
    getRect(targetCoordinateSpace) {
        let rect = new Rectangle();
        if (targetCoordinateSpace instanceof DisplayObject) {
            rect.setTo(targetCoordinateSpace.x, targetCoordinateSpace.y, targetCoordinateSpace.width, targetCoordinateSpace.height);
        };
        return rect;
    }
    /**
     * 将 point 对象从舞台（全局）坐标转换为显示对象的（本地）坐标。
     * @param {Point} point 
     * @return {Point} 
     */
    globalToLocal(point) {
        return new Point(point.x - this._global_x, point.y - this._global_y);
    }
    /**
     * 将 point 对象从显示对象的（本地）坐标转换为舞台（全局）坐标。
     * @param {Point} point 
     * @return {Point}
     */
    localToGlobal(point){
        return new Point(point.x + this._global_x, point.y + this._global_y);
    }
    /**
     * 计算显示对象的边框，以确定它是否与 obj 显示对象的边框重叠或相交。
     * @param {DisplayObject} obj 
     * @return {Boolean} 
     */
    hitTestObject(obj) {
        if(obj instanceof DisplayObject){
            let L1 = this._global_x, R1 = L1 + this.width;
            let T1 = this._global_y, B1 = T1 + this.height;
            let L2 = obj._global_x, R2 = L2 + obj.width;
            let T2 = obj._global_y, B2 = T2 + obj.height;
            if (!(R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2)) {
                return true;
            };
        };
        return false;
    }
    /**
     * 计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。
     * x 和 y 参数指定舞台的坐标空间中的点，而不是包含显示对象的显示对象容器中的点（除非显示对象容器是舞台）。
     * @param {Number} x 
     * @param {Number} y 
     */
    hitTestPoint(x, y) {
        return this._global_rect.contains(x,y);
    }
    /**
     * 被激活存在两种情况
     * 1、父级对象已经挂载到舞台对象stage而给它添加子元素
     * 2、父级对象未被挂载到舞台对象stage而给它添加子元素
     * 备注:只有被挂载到舞台的时候才可以渲染并且从新计算全局坐标系
     */
    activation(){
        let child;
        if(this.parent){//只要向上寻找是否存在父级元素
            this._stage = this.parent.stage;//舞台渲染对象
            this._global_x = this.parent._global_x + this.x;//相对与舞台的坐标系 x轴
            this._global_y = this.parent._global_y + this.y;//相对与舞台的坐标系 y轴
            this._global_rect.setTo(this._global_x,this._global_y,this.width,this.height);
            for (let i = this.childList.length - 1; i >= 0; i--) {
                child = this.childList[i];
                if (child && child.visible) {
                    child.activation();
                };
            };
        };
    }
    enterFrame() {
        
    };
    /**
     * 当每次帧频结束之前调用渲染引擎绘制,并且递归子元素进行渲染
     * @param {engine} engine 
     */
    exitFrame(engine){
        let child;
        this.enterFrame();
        engine.draw(this);
        for (let i = this.childList.length - 1; i >= 0; i--) {
            child = this.childList[i];
            if (child && child.visible) {
                child.exitFrame(engine);
            };
        };
    };
}
export default DisplayObject;