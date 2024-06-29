export const vertexShader = /* glsl */ `
attribute vec2 uv1;
varying vec3 vPosition;
varying vec2 vUv;
varying vec2 vUv1;
varying vec3 vNormal;
void main() {
    vUv = uv;
    vUv1 = uv1;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vPosition = viewPosition.xyz;
    vNormal = normalize(normalMatrix * normal); // Transform the normal to view space
    gl_Position = projectionMatrix * vec4(vPosition, 1.0);
}`;

export const fragmentShader = /* glsl */ `

uniform float time;
uniform sampler2D iconTexture;
uniform sampler2D normalMap;
uniform vec3 flatColor;
uniform vec3 lightDirection;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 vUv1;

vec3 skyLightColor = vec3(0.4,0.4,0.47);
vec3 sunLightColor = vec3(0.9,0.7,0.6);

void main() {
    precision highp float;    
    float iconTransparency = texture(iconTexture, vUv).a;
    vec3 cargoHalfTone = mix(flatColor.rgb+0.3, flatColor.rgb-0.3,  iconTransparency);

    vec3 normal = normalize(vNormal);
    vec3 ray = normalize(lightDirection);
    float diffusionFactor = dot(normal, ray);
    
    vec3 finalColor = mix(skyLightColor, cargoHalfTone, diffusionFactor);
    if (diffusionFactor > 0.0) {
        finalColor = mix(finalColor, sunLightColor, diffusionFactor*0.5);
    }
    gl_FragColor = vec4(finalColor, 1);

}`;
