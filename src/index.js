import utile from './game/utils';
import Stage from './game/display/Stage';
import Sprite from './game/display/Sprite';
let bitmaps = {};
const StageUi = new Stage(document.querySelector("canvas"));
utile.queueBitmap([{"start":"/images/start.png"}],bitmaps,()=>{
    let button,bitmap = bitmaps.start;
    let box = new Sprite();
    box.width = 200;
    box.height = 200;
    box.x = 80;
    let bubox =  new Sprite();
    bubox.name = "bubox";
    bubox.x = 50;
    let buts = [];
    for(let i=0;i<5;i++){
        button = new Sprite();
        button.bitmap = bitmap;
        button.y = i*20;
        button.width = bitmap.width/2;
        button.height = bitmap.height/2;
        buts.push(button);
        bubox.addChild(button);
    }
    box.addChild(bubox);
    StageUi.addChild(box);
    document.querySelector("canvas").addEventListener("click",(ev)=>{
        buts[3].x = ev.offsetX - buts[3].globalX;
        buts[3].y = ev.offsetY - buts[3].globalY;
        console.log(buts[3].x,ev.offsetX,buts[3]._global_x); 
    });
});
