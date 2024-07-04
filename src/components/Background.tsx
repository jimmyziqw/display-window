import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import backgroundMaterial from "../materials/backgroundMaterial.ts";
import useNode from "../utils/useNode.ts";

type objectSetProps = {
    name: string;
    texturePath: string;
};

export default function Background({ name, texturePath }: objectSetProps) {
    const texture = useTexture(texturePath);
    const node = useNode(name);

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
