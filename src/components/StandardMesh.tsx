import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import useNode from "../utils/useNode.ts";

type StandardMeshProps = {
  name: string;
  color?: string | null;
  selected?: string | null;
  texture?: THREE.Texture | null;
};

export const StandardMesh = ({ name, color, selected, texture = null }: StandardMeshProps) => {
  const mesh = useNode(name);
  const meshRef = useRef(mesh);
  const [currentColor, setCurrentColor] = useState<string | null>(null);

  // Update color only if this mesh is the selected one
  useEffect(() => {
    if (name === selected && color) {
      setCurrentColor(color);
    }
  }, [color, name, selected]);

  const material = useMemo(() => {
    if (currentColor) {
      return new THREE.MeshStandardMaterial({
        color: currentColor,
        depthTest: true,
      });
    }
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
    return null;
  }, [texture, currentColor, mesh.material]);

  return (
    <mesh
      castShadow
      receiveShadow
      ref={meshRef}
      geometry={mesh.geometry}
      material={material || mesh.material}
      position={mesh.position}
      rotation={mesh.rotation}
      name={mesh.name}
    />
  );
};

export const mStandardMesh = React.memo(StandardMesh);
