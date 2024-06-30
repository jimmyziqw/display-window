import { useMemo, useRef } from "react";
import * as THREE from "three";
import useNode from "../hooks/useNode.ts";


type StandardMeshProps = {
  name: string;
  texture?: THREE.Texture | null;
};
export const StandardMesh = ({ name, texture = null }: StandardMeshProps) => {
  const mesh = useNode(name);
  const meshRef = useRef(mesh);

  const material = useMemo(() => {
      if (texture) {
          const originalColor = (mesh.material as THREE.MeshStandardMaterial).color;
          texture.flipY = false;
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          return new THREE.MeshStandardMaterial({
              color: originalColor,
              map: texture,
              depthTest: true,
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
