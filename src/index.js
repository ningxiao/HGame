import glsl from './glsl/vert/map.glsl';
import utile from './game/utils';
import Stage from './game/display/Stage';
import Sprite from './game/display/Sprite';
import MouseEvent from './game/events/MouseEvent';
const StageUi = new Stage(document.querySelector("canvas"));
const bitmaps = {};
utile.queueBitmap([{"start":"/images/start.png"}],bitmaps,()=>{
    let button,bitmap = bitmaps.start;
    let box = new Sprite();
    box.width = 400;
    box.height = 400;
    box.x = 80;
    box.name = "box";
    let bubox =  new Sprite();
    bubox.name = "bubox";
    bubox.x = 50;
    bubox.width = 250;
    bubox.height = 250;
    let buts = [];
    for(let i=0;i<5;i++){
        button = new Sprite();
        button.bitmap = bitmap;
        button.name = i;
        button.y = i*40;
        button.width = bitmap.width/2;
        button.height = bitmap.height/2;
        buts.push(button);
        bubox.addChild(button);
    }
    box.addChild(bubox);
    StageUi.addChild(box);
    button = buts[3];
    button.buttonMode = true;
    button.addEventListener(MouseEvent.CLICK,(ev)=>{
        console.log(`第${ev.target.name}个被点击`);
    });
    button.addEventListener(MouseEvent.MOUSE_MOVE,(ev)=>{
        console.log(`第${ev.target.name}个被获取焦点`);
    })
    // document.querySelector("canvas").addEventListener("click",(ev)=>{
    //     console.log(button.focus);
    //     button.x = (ev.offsetX - button.globalX) - button.width/2;
    //     button.y = (ev.offsetY - button.globalY) - button.height/2;
    //     console.log(buts[3].x,ev.offsetX,buts[3]._global_x); 
    // });
});
