export const vertexShader = /*glsl*/ `
uniform float uTime;
varying vec3 vColor;

float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}
float easeOut(float time) {
    float duration = 0.5;
    float progress = -min(time, 1.0);
    float powerOut = pow(progress,  4.0);
    
    return min(powerOut,1.0);
}

void main() {
    vColor = color;
    float time = 2.0 * uTime;
    float positionScaler = easeOut(time);
    vec3 newPosition = position * positionScaler;
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    float randScale = rand(position.xy);
    gl_PointSize = randScale * 1.5;
    gl_Position = projectionMatrix * mvPosition;

}`;

export const fragmentShader = /*glsl*/ `
uniform float uTime;
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1.0) * clamp(uTime, 0.0, 0.3);
}`;
