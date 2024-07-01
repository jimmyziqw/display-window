import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mx_bits_to_01 } from "three/examples/jsm/nodes/materialx/lib/mx_noise.js";

// Define the type for selectable item information
type SelectableInfo = {
  radius: number;
  rotationZ: number;
  position:[number, number, number]
  colors: string[];
};

// Default values for selectable items
const defaultSelectableInfo: SelectableInfo = {
  radius: 0.5,
  rotationZ: 0,
  position: [0,0,0],
  colors: ["white"],
};

// Configuration for specific selectable items
const selectableInfos: Record<string, Partial<SelectableInfo>> = {
  desk: { radius: 1, rotationZ: 0.1, position: [0, -0.5, 0], colors: ["pink", "cyan", "orange", "green"] },
  lamp: { radius: 1, rotationZ: 0.2, position: [0, 0, 0], colors: ["yellow", "blue"] },
  
};

// Function to get the merged selectable info
const getSelectableInfo = (name: string): SelectableInfo => {
  const info = selectableInfos[name] || {};
  return { ...defaultSelectableInfo, ...info };
};

// Carousel component
export function Carousel({ visible, name }: { visible: boolean; name: string }) {
  const groupRef = useRef<THREE.Group>(null);
  console.log('name', name)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const { radius, colors, position } = getSelectableInfo(name);
  const cardSize = 0.2;
  const angle = (2 * Math.PI) / colors.length;
  console.log('color',colors)
  return (
    <group ref={groupRef} position={position} rotation={[0, 0, Math.PI / 20]} visible={visible}>
      {colors.map((color, idx) => (
        <ColorCard idx={idx} angle={angle} radius={radius} cardSize={cardSize} color={color}/>
      ))}
    </group>
  );
}

function ColorCard({idx, angle, radius, cardSize, color}:any) {
    const meshRef = useRef<THREE.Mesh>(null);
    return (
        <mesh
        key={idx}
        ref={meshRef}
        position={[Math.cos(angle * idx) * radius, 0, Math.sin(angle * idx) * radius]}
        rotation={[0, Math.PI / 2 - angle * idx, Math.PI / 2]}
      //   onClick={}
      >
        <planeGeometry args={[cardSize, cardSize, 1, 1]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    )
}