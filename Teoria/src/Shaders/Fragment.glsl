// precision mediump float;

uniform sampler2D Texture;//sampler2D é o tipo de texturas 
uniform vec3 Color;

varying float fRandom;
varying float Time2;
varying vec2 fuv;
varying float Felevation;

void main()
{

    vec4 TextureColor = texture2D(Texture, fuv);
    TextureColor.rgb *= Felevation + 0.6;

    gl_FragColor = TextureColor;
    
    // float t = sin(Time2);
    // gl_FragColor = vec4(t, t * 0.5, 1.0 - t, 1.0); // Gradiente de cores azul para amarelo
    // gl_FragColor = vec4(smoothstep(0.0, 1.0, t), 0.0, 1.0 - smoothstep(0.0, 1.0, t), 1.0);//rgb e alpha
}