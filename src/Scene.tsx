import { useRef, useState } from "react";
import { EffectComposer, Outline, Select, Selection } from "@react-three/postprocessing";
import * as THREE from "three";
import Background from "./components/Background.tsx";
import useRespondAspectChange from "./utils/useRespondAspectChange.ts";
import { StandardMesh } from "./components/StandardMesh.tsx";
import { useFrame } from "@react-three/fiber";
import { Carousel } from "./components/Carousel.tsx";
export default function Scene() {
    useRespondAspectChange();
    return (
        <>
            <InteractableMeshes />
            <StandardMesh name="floor" />
            <StandardMesh name="window" />
            <StandardMesh name="window001" />

            <Background name="background" texturePath="textures/solarium5.jpg" />
            <Background name="background001" texturePath="textures/solarium5.jpg" />
        </>
    );
}

function InteractableMeshes() {
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const [color, setColor] = useState<string|null>(null);

    const pointerOverHandler = (name: string) => {
        setHovered(name);
        document.body.style.cursor = "pointer";
    };
    const pointerOutHandler = () => {
        setHovered(null);
        document.body.style.cursor = "default";
    };
  
    const meshNames = ["desk", "lamp"];

    const items = meshNames.map((name) => (
        <>
            <Select
                key={name}
                enabled={hovered === name}
                onPointerOver={() => pointerOverHandler(name)}
                onPointerOut={pointerOutHandler}
                onClick={() => setSelected(name)}
            >
                <StandardMesh name={name} color={color}/>
            </Select>
        </>
    ));
    return (
        <>
            <Carousel name={selected} visible={selected != null} />
            <Selection>
                {items}
                <Effects selected={selected} hovered={hovered} />
            </Selection>
        </>
    );
}

function Effects({ selected, hovered }: { selected: string | null; hovered: string | null }) {
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
//
