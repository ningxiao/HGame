import H5Engine from './h5/H5Engine';
import WxEngine from './wx/WxEngine';
import GlEngine from './gl/GlEngine';
export default (canvas, engine) => {
    switch (engine) {
        case 'wx':
            return new WxEngine(canvas);
            break;
        case 'h5':
            return new H5Engine(canvas);
            break;
        case 'gl':
            return new GlEngine(canvas);
            break;
        default:
            break;
    }
};