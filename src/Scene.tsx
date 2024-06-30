import { useMemo, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { EffectComposer, Outline, Select, Selection } from "@react-three/postprocessing";
import * as THREE from "three";
import Background from "./components/Background.tsx";
import useRespondAspectChange from "./utils/useRespondAspectChange.ts";
import useNode from "./hooks/useNode.ts";

export default function Scene() {
    useRespondAspectChange();
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    const items = ["window", "window001", "desk", "lamp"].map((name) => (
        <Select
            enabled={selected === name || hovered === name}
            onPointerOver={() => setHovered(name)}
            onPointerOut={() => setHovered(null)}
            onClick={() => setSelected(name)}
        >
            <StandardMesh name={name} />
        </Select>
    ));
    return (
        <>
			<Selection>
				{items}
				<Effects selected={selected} hovered={hovered} />
			</Selection>
			<StandardMesh name="window001" />
			<StandardMesh name="floor" />
			<Background name="background" texturePath="textures/solarium5.jpg" />
			<Background name="background001" texturePath="textures/solarium5.jpg" />
        </>
    );
}


function Effects({ selected, hovered }: { selected: string | null; hovered: string | null }) {
    const selectedObjects = selected ? [selected] : [];
    const hoveredObjects = hovered && hovered !== selected ? [hovered] : selectedObjects;
    return (
        <EffectComposer multisampling={0} autoClear={false}>
            <Outline
                blur
                edgeStrength={10}
                width={1000}
                visibleEdgeColor={
                    hoveredObjects.length > 0
                        ? hoveredObjects[0] === selected
                            ? 0xffa500
                            : 0xffffff
                        : 0xffffff
                }
            />
        </EffectComposer>
    );
}

type StandardMeshProps = {
    name: string;
    texture?: THREE.Texture | null;
    isVisible?: boolean;
    onClick?: () => void;
};
export const StandardMesh = ({
    name,
    texture = null,
    isVisible = true,
    onClick,
    ...props
}: StandardMeshProps) => {
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
            {...props}
        />
    );
};
