import * as THREE from "three";
const vertexShader = /* glsl */ `
varying vec3 vPosition;
varying vec2 vUv;
varying vec4 vWorldPosition;

void main() {
    vUv = uv;
    vWorldPosition = modelMatrix * vec4(position,1.0);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vPosition = viewPosition.xyz;
    gl_Position = projectionMatrix * vec4(vPosition, 1.0);
}`;

const fragmentShader = /* glsl */ `
precision highp float; 
uniform sampler2D u_texture;
varying vec4 vWorldPosition;
varying vec2 vUv;
varying vec3 vLightPosition;

 
    void main() {
    vec4 texColor = texture2D(u_texture, vUv); 
  float alpha = texColor.a;
  
    
    texColor.a = alpha;
    gl_FragColor = vec4(texColor);
   
}`;

export default function getRawMaterial(texture: THREE.Texture) {
    return new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            u_texture: { value: texture },
        },
        depthTest: true,
        side: THREE.DoubleSide,
    });
}
