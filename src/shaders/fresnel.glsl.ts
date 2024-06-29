// https://developer.download.nvidia.com/CgTutorial/cg_tutorial_chapter07.html

export const vertexShader = /*glsl*/ `
uniform float fresnelBias;
uniform float fresnelScale;
uniform float fresnelPower;
varying float vReflectionFactor;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);
    vec3 I = worldPosition.xyz - cameraPosition;
    vReflectionFactor = fresnelBias + fresnelScale * pow(1.0 + dot(normalize(I), worldNormal), fresnelPower);
    gl_Position = projectionMatrix * mvPosition;
}
`;

export const fragmentShader = /*glsl*/ `
uniform vec3 color1;
uniform vec3 color2;
varying float vReflectionFactor;

void main() {
    float f = clamp(vReflectionFactor, 0.0, 1.0);
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
}
`;