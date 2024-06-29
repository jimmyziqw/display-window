import { useMemo, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { EffectComposer, Outline, Select, Selection } from "@react-three/postprocessing";
import * as THREE from "three";
import Background from "./components/Background.tsx";
import useRespondAspectChange from "./utils/useRespondAspectChange.ts";
import DirectionalLight from "./components/DirectionalLight.tsx";
import useNode from "./hooks/useNode.ts";

export default function Scene() {
    useRespondAspectChange();
    // const { nodes } = useGLTF("models/model.glb");
    return (
        <>
            <group>
                <DirectionalLight name="primary" />
                <DirectionalLight name="secondary" />
                <ambientLight intensity={0.5} />
                <Selection>
                    <StandardMesh name="window" />
                    <StandardMesh name="desk" />
                    <StandardMesh name="lamp" />
                    <Effects />
                </Selection>
                <StandardMesh name="window001" />
                <StandardMesh name="floor" />
                <Background name="background" texturePath="textures/solarium5.jpg" />
                <Background name="background001" texturePath="textures/solarium5.jpg" />
            </group>
        </>
    );
}

type StandardMeshProps = {
    name: string;
    texture?: THREE.Texture | null;
    isVisible?: boolean;
    onClick?: () => void;
};

function Effects() {
    return (
        <EffectComposer multisampling={2} autoClear={false}>
            <Outline
                blur
                visibleEdgeColor={0xffffff}
                edgeStrength={10}
                width={1000}
                selectionLayer={10}
            />
        </EffectComposer>
    );
}

export const StandardMesh = ({
    name,
    texture = null,
    isVisible = true,
    onClick,
    ...props
}: StandardMeshProps) => {
    const mesh = useNode(name);
    const meshRef = useRef(mesh);
    const [hovered, hover] = useState(false);

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
        <Select
            enabled={hovered}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
        >
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
                // onClick={onClick}
            />
        </Select>
    );
};
