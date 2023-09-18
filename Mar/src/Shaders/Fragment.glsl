uniform vec3 DepthColor;
uniform vec3 SurfaceColor;
uniform float SurfaceColorAdicional;
uniform float SurfaceColorPower;

varying float Felevation;

void main()
{
    float mixStrength = (Felevation + SurfaceColorAdicional) * SurfaceColorPower;
    vec3 color = mix(DepthColor, SurfaceColor, mixStrength);
    gl_FragColor = vec4(color, 1.0);
}