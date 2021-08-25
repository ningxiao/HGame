/**
 * User: ningxiao
 * Engine 底层执行各种数据与图形渲染
 */
class H5Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.domMap = new Map();
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
    }
    clearRect(x = 0, y = 0, width = this.width, height = this.height) {
        for (const dom of this.domMap) { // 遍历Map
            if (dom[0].visible) {
                dom[1].style.display = 'block';
            } else {
                dom[1].style.display = 'none';
            }
        }
    }
    drawImage(displayobject) {
        const dom = this.domMap.get(displayobject);
        const x = displayobject.globalX - displayobject.parent.globalX;
        const y = displayobject.globalY - displayobject.parent.globalY;
        dom.style.transform = `translate(${x}px, ${y}px)`;
        if(displayobject.frames){
            let bitmap;
            if (bitmap = displayobject.bitmap) {
                dom.style.backgroundPosition = `${bitmap.x}px ${-bitmap.y}px`;
                dom.style.backgroundSize  = `auto`;
            };
        }
    }
    drawMouse(displayobject) {
        if (displayobject && displayobject.buttonMode) {
            this.canvas.style.cursor = "pointer";
        } else {
            this.canvas.style.cursor = "auto";
        };
    }
    draw(displayobject) {
        if (displayobject) {
            if (!this.domMap.has(displayobject)) {
                let bitmap, cssText;
                const dom = document.createElement('div');
                this.domMap.set(displayobject, dom);
                dom.id = displayobject.uid;
                dom.classList.add('sprite');
                cssText = `transform: translate(${displayobject.globalX}px, ${displayobject.globalY}px);width: ${displayobject.width}px;height: ${displayobject.height}px;`;
                if (bitmap = displayobject.bitmap) {
                    cssText += `background-image: url('${bitmap.imgdata.src}');`;
                };
                dom.style.cssText = cssText;
                (this.domMap.get(displayobject.parent) || this.canvas).appendChild(dom);
            }
            this.drawImage(displayobject);
        }
    }
}
export default H5Engine;