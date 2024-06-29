import { useMemo, useRef } from "react";
import * as THREE from "three";
type StandardMeshGroupProps = {
  groupRef: any;
  objects: THREE.Mesh[];
  texture: THREE.Texture|null;
  isVisible: boolean;
};

export default function StandardMeshGroup({ groupRef, objects, texture,...props }: StandardMeshGroupProps) {
  return (
   (
      <group ref={groupRef}>
        {objects.map((obj, index) => (
          <StandardMesh key={index} mesh={obj as THREE.Mesh} texture={texture} {...props }/>
        ))}
      </group>
    )
  );
}

type StandardMeshProps = {
  mesh: THREE.Mesh;
  texture?: THREE.Texture | null;
  isVisible?: boolean;
};

export const StandardMesh = ({ mesh, texture = null, isVisible = true, ...props }: StandardMeshProps) => {
  const meshRef = useRef(mesh);
  // const texture = useTexture(texturePath );
  const material = useMemo(() => {
    if (texture) {
      let originalColor;
      originalColor = (mesh.material as THREE.MeshStandardMaterial).color;
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      return new THREE.MeshStandardMaterial({
        color: originalColor,
        map: texture,
        depthTest: true,
        ...props,
      });
    }
  }, [texture]);

  return (
    <mesh
      castShadow
      receiveShadow
      ref={meshRef}
      geometry={mesh.geometry}
      material={texture ? material : mesh.material}
      position={mesh.position}
      rotation={mesh.rotation}
      name={mesh.name}
    />
  );
};


