import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import backgroundMaterial from "../materials/backgroundMaterial.ts";
import useNode from "../hooks/useNode.ts";
import * as THREE from "three";

type objectSetProps = {
    name: string;
    texturePath: string;
    // transparent?: boolean;
};

export default function Background({ name, texturePath }: objectSetProps) {
    const texture = useTexture(texturePath);
    const node = useNode(name);

    // postprocessing overrides custom shader color space
    if (texture) texture.colorSpace = THREE.SRGBColorSpace;

    const material = useMemo(() => {
        texture.flipY = false;
        const material = backgroundMaterial(texture);
        return material;
    }, []);

    return (
        <mesh
            geometry={node.geometry}
            material={material}
            position={node.position}
            rotation={node.rotation}
        />
    );
}
