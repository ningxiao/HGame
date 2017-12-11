import utils from '../utils';
/**
 * User: ningxiao
 * Date: 17-12-10
 * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
 */
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        //从 (0,0) 到此点的线段长度。
        this.length = utils.pointLength(this.x, this.y);
    }
    /**
     * [静态方法] 返回 pt1 和 pt2 之间的距离。
     * @param {Point} pt1 
     * @param {Point} pt2 
     * @return {Number} 两点距离
     */
    static distance(pt1, pt2) {
        let x = pt1.x - pt2.x;
        let y = pt1.y - pt2.y;
        return utils.pointLength(x, y);
    }
    /**
     * 创建此 Point 对象的副本。
     * @return {Point} 新的 Point 对象。
     */
    clone() {
        return new Point(this.x, this.y);
    }
    /**
     * 将另一个点的坐标添加到此点的坐标以创建一个新点。
     * @param {Point} v 
     */
    add(v) {
        return new Point(this.x + v.x, this.y + v.y);
    }
    /**
     * 确定两个点是否相同。
     * @param {Point} oCompare 
     * @return {Boolean} 
     */
    equals(toCompare) {
        if (this.x === toCompare.x && this.y === toCompare.y) {
            return true;
        };
        return false;
    }
    /**
     * 将 Point 的成员设置为指定值
     * @param {Number} xa 
     * @param {Number} ya 
     */
    setTo(xa,ya){
        this.x = xa;
        this.y = ya;
        this.length = utils.pointLength(this.x, this.y);
    }	
    /**
     * 按指定量偏移 Point 对象。
     * @param {Number} dx 
     * @param {Number} dy 
     */
    offset(dx, dy){
        this.setTo(this.x + dx ,this.y +dy);
    }
}
export default Point;