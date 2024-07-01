import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type SelectableInfo = {
    colors: string[];
};

const defaultSelectableInfo: SelectableInfo = {
    colors: ["white"],
};

const selectableInfos: Record<string, Partial<SelectableInfo>> = {
    desk: { colors: ["pink", "#786e65", "#d5d3d6", "#999fa8"]},
    lamp: { colors: ["#5f6a5e", "#3d5466", "#79a9d2", "#a7ced3"] },
    blossomBase: { colors: ["#d5d3d6", "#999fa8"] },
    coffeeCup: { colors: ["yellow", "blue"] },
    coffeePlate: { colors: ["#5f6a5e", "#3d5466", "#79a9d2", "#a7ced3"] }
};
const getSelectableInfo = (name: string): SelectableInfo => {
    const info = selectableInfos[name] || {};
    return { ...defaultSelectableInfo, ...info };
};

export function Carousel({ name, setColor }: { name: string; setColor: (color: string) => void }) {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
    });
    const radius = 1.0;
    const { colors } = getSelectableInfo(name);
    const angle = (2 * Math.PI) / colors.length;
    console.log("color", colors);

    return (
        <group ref={groupRef} position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 18]}>
            {colors.map((color, idx) => (
                <ColorCard
                    idx={idx}
                    angle={angle}
                    radius={radius}
                    cardColor={color}
                    setMeshColor={setColor}
                />
            ))}
        </group>
    );
}

function ColorCard({ idx, angle, radius, cardColor, setMeshColor }: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const clickHandler = () => {
        setMeshColor(cardColor);
    };
    return (
        <mesh 
            key={idx}
            ref={meshRef}
            position={[Math.cos(angle * idx) * radius, 0, Math.sin(angle * idx) * radius]}
            rotation={[0, Math.PI / 2 - angle * idx, Math.PI / 2]}
            onClick={clickHandler}
            onPointerOver={()=>{ document.body.style.cursor = "pointer"}}
        >
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color={cardColor} side={THREE.DoubleSide} />
        </mesh>
    );
}
