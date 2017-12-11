import Bitmap from '../display/Bitmap';
/**
 * User: ningxiao
 * Date: 17-12-10
 * 工具帮助类
 */
const utils = {
    /**
     * 勾股定理求得两点距离
     */
    pointLength: (x, y) => {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    },
    /**
     * @param {Array} srcs 图片加载列表
     * @param {Object} bitmaps bitmap存储对象
     * @param {Function} complete 成功回调函数
     * @param {Function} progress 加载进度回调函数
     */
    queueBitmap: (srcs, bitmaps, complete, progress) => { //实现对图片队列加载
        let count = arguments[4] || 0, key, src;
        let img = new Image(), data = srcs[count];
        for (key in data) {
            src = data[key];
        };
        img.onload = ()=> {
            bitmaps[key] = new Bitmap(img);
            count++;
            progress && progress.call(this, { "total": srcs.length, "loaded": count });
            if (count != srcs.length) {
                utils.queueImg(srcs, bitmaps, complete, progress, count);
            } else {
                complete();
            };
        }
        img.src = src;
    },
}
export default utils;