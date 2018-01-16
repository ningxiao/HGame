import config from '../config';
import H5Engine from './h5/H5Engine';
import WxEngine from './wx/WxEngine';
export default (canvas) => {
    switch (config.engine) {
        case 'wx':
            return new WxEngine(canvas);
            break;
        case 'h5':
            return new H5Engine(canvas);
            break;
        default:
            break;
    }
};