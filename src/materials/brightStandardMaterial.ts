import * as THREE from "three";
export default class BrightMeshStandardMaterial extends THREE.MeshStandardMaterial {
  constructor(parameters: Object) {
    super(parameters);

    this.onBeforeCompile = (shader) => {
      this.userData.shader = shader;
      shader.vertexShader = /* glsl */ `
                varying vec3 vWorldPosition;
                ${shader.vertexShader}
            		`;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        /*glsl*/ `
                #include <begin_vertex> 
                vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
								vNormal = normal;
                `
      );

      shader.fragmentShader = /*glsl*/ `
                varying vec3 vWorldPosition;
								
                ${shader.fragmentShader}
            `;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        /*glsl*/ `          
				vec3 direction = vec3(-1,1,1);
				vec3 flatColor = vec3(0, 1, 1);
				vec3 flatColor2 = vec3(0.7, 1, 1);
				float diffusion = dot(normalize(vNormal) , normalize(direction));
				vec3 addedColor = flatColor * diffusion;
        gl_FragColor.rgb = mix(flatColor2, addedColor, 0.6);         
        #include <dithering_fragment>
        `
      );
    };
  }
}
