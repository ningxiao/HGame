import utile from './game/utils';
import Stage from './game/display/Stage';
import Sprite from './game/display/Sprite';
import Bitmap from './game/display/Bitmap';
import MovieClip from './game/display/MovieClip';
import MouseEvent from './game/events/MouseEvent';
const engine = new URLSearchParams(window.location.search).get('engine');
const isEngine = engine === 'h5';
const canvas = document.createElement(isEngine ? 'div' : 'canvas');
document.title = ((engine) => {
    switch (engine) {
        case 'wx':
            return 'canvas渲染';
            break;
        case 'h5':
            return 'html渲染';
            break;
        case 'gl':
            return 'webgl渲染'
            break;
        default:
            break;
    }
})(engine);
canvas.classList.add('stage');
document.body.appendChild(canvas);
const StageUi = new Stage(canvas, engine);
const bitmaps = {};
utile.queueBitmap([{
    name: 'start',
    url: "./images/start.png",
}, {
    name: 'monster',
    url: "./images/monster.png",
}, {
    name: 'coinAni',
    url: "./images/coinAni.png",
}], bitmaps, () => {
    let button, bitmap = bitmaps.start;
    let box = new Sprite();
    box.width = 400;
    box.height = 400;
    box.x = 80;
    box.name = "box";
    let bubox = new Sprite();
    bubox.name = "bubox";
    bubox.x = 50;
    bubox.width = 250;
    bubox.height = 250;
    let buts = [];
    for (let i = 0; i < 2; i++) {
        button = new Sprite();
        button.bitmap = bitmap;
        button.name = i;
        button.y = i * 60 + 20;
        button.width = Math.floor(bitmap.width / 2);
        button.height = Math.floor(bitmap.height / 2);
        buts.push(button);
        bubox.addChild(button);
    }
    box.addChild(bubox);
    const monster = new Sprite();
    const monsterbitmap = bitmaps.monster;
    monster.bitmap = monsterbitmap;
    monster.name = 'monster';
    monster.y = 120;
    monster.buttonMode = true;
    monster.width = monsterbitmap.width / 2;
    monster.height = monsterbitmap.height / 2;
    StageUi.addChild(box);
    StageUi.addChild(monster);
    StageUi.exitFrame();
    button = buts[1];
    button.buttonMode = true;
    button.addEventListener(MouseEvent.CLICK, (ev) => {
        console.log(`点击移动怪兽`, monster.x);
        monster.x += 2;
    });
    buts[0].addEventListener(MouseEvent.CLICK, (ev) => {
        console.log(`点击添加金币`);
        const ani = new MovieClip();
        ani.width = 60;
        ani.height = 60;
        ani.y = Math.random() * 100 + Math.random() * 50;
        ani.x = Math.random() * 100 + Math.random() * 50;
        for (let index = 0; index < 10; index++) {
            ani.addFrame(new Bitmap(bitmaps.coinAni.imgdata, 0, index * 60, 60, 60));
        }
        StageUi.addChild(ani);
    });
});