//Linguagem tipada

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 Frequency;
uniform float Time;
uniform float Speed;


attribute vec3 position;//attribute acessa um atributo da geometria
attribute float vRandom;


varying float fRandom;//varying é pra gnt poder acessar do Fragment shader
varying float Time2;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * Frequency.x + Time * Speed) * 0.1;
    // modelPosition.z += sin(modelPosition.y * Frequency.y ) * 0.1;
    // 0.1 pra curva ficar mais suave

    // modelPosition.z += vRandom * 0.1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    fRandom = vRandom;
    Time2 = Time;
}