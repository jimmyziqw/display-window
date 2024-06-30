import { useState } from "react";
import { EffectComposer, Outline, Select, Selection } from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";

import * as THREE from "three";
import Background from "./components/Background.tsx";
import useRespondAspectChange from "./utils/useRespondAspectChange.ts";
import { StandardMesh } from "./components/StandardMesh.tsx";
import { useThree } from "@react-three/fiber";
import { FPSLimiter } from "./FPSLimiter.tsx";
export default function Scene() {
    useRespondAspectChange();
    return (
        <>
			<FPSLimiter fps={50} />
            <InteractableMeshes />
            <StandardMesh name="floor" />
            <Background name="background" texturePath="textures/solarium5.jpg" />
            <Background name="background001" texturePath="textures/solarium5.jpg" />
        </>
    );
}
function InteractableMeshes() {
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    const meshNames = ["window", "window001", "desk", "lamp"];
    const items = meshNames.map((name) => (
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
        <Selection>
            {items}
            <Effects selected={selected} hovered={hovered} />
        </Selection>
    );
}

function Effects({ selected, hovered }: { selected: string | null; hovered: string | null }) {
	const { size } = useThree()

	const selectedObjects = selected ? [selected] : [];
    const hoveredObjects = hovered && hovered !== selected ? [hovered] : selectedObjects;
    const visibleEdgeColor =
        hoveredObjects.length > 0
            ? hoveredObjects[0] === selected
                ? 0xffa500
                : 0xffffff
            : 0xffffff;

    return (
        <EffectComposer stencilBuffer multisampling={4} autoClear={false}>
            <Outline
                blur
                edgeStrength={10}
                width={1000}
				height={1000} // lower render height for better performance
                visibleEdgeColor={visibleEdgeColor}
            />
        </EffectComposer>
    );
}
