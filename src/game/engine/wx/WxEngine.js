/**
 * User: ningxiao
 * Date: 17-12-10
 * Engine 底层执行各种数据与图形渲染
 */
class WxEngine{
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
        this.ctx = this.canvas.getContext("2d");
        this.ratio = this._getratio;
        this.ctx.scale(this.ratio, this.ratio);
    }
    get _getratio() {
        let dpr = window.devicePixelRatio || 1;
        let bsr = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1;
        let ratio = dpr / bsr;
        this.canvas.width = this.width * ratio;
        this.canvas.height = this.height * ratio;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        return ratio;
    }
    clearRect(x =0,y =0,width = this.width,height= this.height){
        this.ctx.clearRect(x,y, width, height);
    }
    drawImage(displayobject){
        let x,y,bitmap;
        if(bitmap = displayobject.bitmap){
            this.ctx.drawImage(bitmap.imgdata, bitmap.x, bitmap.y, bitmap.swidth, bitmap.sheight, displayobject.globalX, displayobject.globalY, displayobject.width, displayobject.height);
        };
    }
    drawMouse(displayobject){
        if(displayobject && displayobject.buttonMode){
            this.canvas.style.cursor = "pointer";
        }else{
            this.canvas.style.cursor = "auto";
        };
    }
    draw(displayobject){
        if(displayobject){
            this.ctx.save(); //保存画笔状态
            this.drawImage(displayobject);
            this.ctx.restore(); //绘制结束以后，恢复画笔状态
        }
    }
}
export default WxEngine;