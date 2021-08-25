import Bitmap from '../display/Bitmap';
/**
 * User: ningxiao
 * 工具帮助类
 */
const utils = {
    guid() {
        // 产生ID
        return 'xxxxxx4xxyxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    },
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
        let count = 0;
        const size = srcs.length;
        srcs.forEach((vo) => {
            const {
                url,
                name
            } = vo;
            const img = new Image();
            img.onload = () => {
                count++;
                bitmaps[name] = new Bitmap(img);
                if (progress) {
                    progress.call(this, {
                        "total": srcs.length,
                        "loaded": count
                    });
                }
                if (count >= size) {
                    complete();
                }
            }
            img.src = url;
        });
    },
}
export default utils;