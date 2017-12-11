/**
 * User: ningxiao
 * Date: 17-12-10
 * Graphics 类包含一组可用来创建矢量形状的方法
 * 通过操作canvas的画图API进行高级封装
 */
class Graphics {
    constructor() {
        this.engine = null;
    }
    /**
     * 绘制矢量调用引擎提供的api绘制
     * @param {} engine 
     */
    activation(engine){
        this.engine = engine;
    }
    /**
     * 绘制一个圆。
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} radius 
     */
    drawCircle(x, y, radius) {
        
    }
	/**
     * 绘制一个矩形。
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     */
    drawRect(x, y, width, height) {
        
    }
}
export default Graphics;