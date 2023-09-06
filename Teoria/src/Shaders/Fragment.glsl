precision mediump float;


varying float fRandom;
varying float Time2;


void main()
{
    float t = sin(Time2);
    gl_FragColor = vec4(smoothstep(0.0, 1.0, t), 0.0, 1.0 - smoothstep(0.0, 1.0, t), 1.0);//rgb e alpha
}