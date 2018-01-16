#ifdef GL_ES
precision mediump float;//精度限制
#endif
uniform   sampler2D bitmap;//纹理对象
varying   vec2 ouv;//输出给片段着色器
void main(){
    gl_FragColor = texture2D(bitmap,ouv);
}