import { useCallback, useState } from "react";
import { EffectComposer, Outline, Select, Selection } from "@react-three/postprocessing";
import Background from "./components/Background.tsx";
import useRespondAspectChange from "./utils/useRespondAspectChange.ts";
import { StandardMesh } from "./components/StandardMesh.tsx";
import { ThreeEvent } from "@react-three/fiber";
import { Carousel } from "./components/Carousel.tsx";
import { debounce } from "lodash";

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
    const debouncedSetHovered = useCallback(debounce((name) => {
        setHovered(name);
        document.body.style.cursor = "pointer";
    }, 50), []);
    const pointerOverHandler = (name:string) => (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        debouncedSetHovered(name);
    };

    const pointerOutHandler = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(null);
        document.body.style.cursor = "default";
    };

    const meshNames = ["desk", "lamp"];
    const items = meshNames.map((name) => (
        <>
            <Select
                key={name}
                enabled={hovered === name}
                onPointerOver={pointerOverHandler(name)}
                onPointerOut={pointerOutHandler}
                onClick={() => setSelected(name)}
            >
                <InteractableMesh name={name} selected={selected} />
            </Select>
        </>
    ));
    return (
        <>
            <Selection>
                {items}
                <Effects selected={selected} hovered={hovered} />
            </Selection>
        </>
    );
}
function InteractableMesh({ name, selected }: any) {
    const [color, setColor] = useState<string | null>(null);
    return (
        <>
            <StandardMesh name={name} color={color} selected={selected} />
            {selected === name && <Carousel name={name} setColor={setColor} />}
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

