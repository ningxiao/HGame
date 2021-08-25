import DisplayObject from './DisplayObject';
/**
 * User: ningxiao
 * MovieClip 类提供基于时间轴的序列动画
 */
class MovieClip extends DisplayObject {
    constructor() {
        super();
        this.frames = []; //存放每帧位图与坐标信息
        this.frequency = 3; //动画播放间隔频率
        this.currentFrame = 0;
    }
    addFrame(bitmap) {
        this.frames.push(bitmap);
        for (let i = 0; i < this.frequency - 1; i++) {
            this.frames.push(null);
        }
    }
    enterFrame() {
        if (this.frames[this.currentFrame]) {
            this.bitmap = this.frames[this.currentFrame];
        }
        this.currentFrame++;
        if (this.currentFrame > this.frames.length) {
            this.currentFrame = 0;
        }
    };
    exitFrame(engine) {
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
export default MovieClip;