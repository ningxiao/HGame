/**
 * User: ningxiao
 * Date: 17-12-10
 * 创建一个新 Rectangle 对象，其左上角由 x 和 y 参数指定，并具有指定的 width 和 height 参数。
 * 如果调用此函数时不使用任何参数，将创建一个 x、y、width 和 height 属性均设置为 0 的矩形。
 */
class Rectangle {
    /**
     * 
     * @param {Number} x 默认0
     * @param {Number} y 默认0
     * @param {Number} width 默认0
     * @param {Number} height 默认0
     */
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.top = this.y;
        this.left = this.x;
        this.width = width;
        this.height = height;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
    }
    /**
     * 返回一个新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
     * @return {Rectangle} 
     */
    clone(){
        return new Rectangle(this.x,this.y,this.width,this.height);
    }
    /**
     * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
     * @param {Number} x 
     * @param {Number} y 
     * @return {Boolean} 
     */
    contains(x, y) {
        if (x > this.right || x < this.x || y > this.bottom || y < this.y) {
            return false;
        };
        return true;
    }
    /**
     * 确定此 Rectangle 对象是否为空。
     * @return {Boolean} 
     */
    isEmpty(){
        if(this.x === 0 && this.y === 0 && this.width === 0 && this.height === 0){
            return true;
        };
        return false;
    }
    /**
     * 将 Rectangle 对象的所有属性设置为 0。
     */
    setEmpty(){
        this.x = 0;
        this.y = 0;
        this.top = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
        this.right = 0;
        this.bottom = 0;
    }
    /**
     * 将 Rectangle 的成员设置为指定值
     * @param {Number} xa 
     * @param {Number} ya 
     * @param {Number} widtha 
     * @param {Number} heighta 
     */
    setTo(xa, ya, widtha, heighta){
        this.x = xa;
        this.y = ya;
        this.top = this.y;
        this.left = this.x;
        this.width = widtha || this.width;
        this.height = heighta || this.height;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
    }
    /**
     * @param {Number} dx 将 Rectangle 对象的 x 值移动此数量
     * @param {Number} dy 将 Rectangle 对象的 Y 值移动此数量
     */
    offset(dx,dy){
        this.setTo(this.x + dx ,this.y +dy);
    }
}
export default Rectangle;