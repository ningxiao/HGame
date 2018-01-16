uniform mat4 p_matrix;//正交投影矩阵
attribute vec3 v3position;//属性变量
attribute vec2 iuv;//输入纹理的UV坐标
varying   vec2 ouv;//输出给片段着色器
void main(){
    ouv = iuv;
    gl_Position = p_matrix * vec4(v3position,1.0);
}