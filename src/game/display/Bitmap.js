/**
 * User: ningxiao
 * Bitmap 类表示用于表示位图图像的显示对象,若干Bitmap对象共享BitmapData引用
 */
class Bitmap {
    constructor(img, x = 0, y = 0, swidth, sheight, width, height) {
        this.imgdata = img;
        this.bitmapdata = null;
        this.x = x; //图片偏移X值
        this.y = y; //图片偏移Y值
        this.width = width || img.width; //宽度
        this.height = height || img.height; //高度
        this._swidth = swidth || this.width; //剪切宽度
        this._sheight = sheight || this.height; //剪切高度
    }
    get swidth() {
        return this._swidth;
    }
    get sheight() {
        return this._sheight;
    }
    set swidth(swidth) {
        this._swidth = swidth || this.width;
    }
    set sheight(sheight) {
        this._sheight = sheight || this.height;
    }
}
export default Bitmap;