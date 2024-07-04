import { useCallback, useState } from "react";
import { EffectComposer, Outline, Select, Selection } from "@react-three/postprocessing";
import Background from "./components/Background.tsx";
import useRespondAspectChange from "./utils/useRespondAspectChange.ts";
import { StandardMesh } from "./components/StandardMesh.tsx";
import { Carousel } from "./components/Carousel";
import { ThreeEvent } from "@react-three/fiber";
import { debounce } from "lodash";
import { BoxDimension, DoubleSidedArrow } from "./components/DoubleSidedArrow.tsx";
export default function Scene() {
    useRespondAspectChange();
    return (
        <>
            <InteractableMeshes />
            <StandardMesh name="floor" />
            <StandardMesh name="window" />
            <StandardMesh name="windowFrame" />
            <StandardMesh name="windowFrame001" />
            <StandardMesh name="windowFrame002" />
            <StandardMesh name="blossomFlower" />
            <StandardMesh name="blossomStem" />

            <Background name="background" texturePath="textures/solarium5.jpg" />
            <Background name="background001" texturePath="textures/solarium5.jpg" />
        </>
    );
}

function InteractableMeshes() {
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    const debouncedSetHovered = useCallback(
        debounce((name) => {
            setHovered(name);
            document.body.style.cursor = "pointer";
        }, 50),
        []
    );
    const pointerOverHandler = (name: string) => (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        debouncedSetHovered(name);
    };

    const pointerOutHandler = () => {
        setHovered(null);
        debouncedSetHovered.cancel();
        document.body.style.cursor = "default";
    };

    const meshNames = ["desk", "lamp", "blossomBase", "coffeeCup", "coffeePlate"];
    return (
        <>
            <Selection>
                {meshNames.map((name) => (
                    <Selectable
                        name={name}
                        hovered={hovered}
                        selected={selected}
                        pointerOverHandler={pointerOverHandler}
                        pointerOutHandler={pointerOutHandler}
                        setSelected={setSelected}
                    />
                ))}
                <Effects selected={selected} hovered={hovered} />
            </Selection>
        </>
    );
}
function Selectable({
    name,
    hovered,
    selected,
    pointerOverHandler,
    pointerOutHandler,
    setSelected,
}: any) {
    const [color, setColor] = useState<string | null>(null);
    return (
        <>
            <Select
                key={name}
                enabled={hovered === name}
                onPointerOver={pointerOverHandler(name)}
                onPointerOut={pointerOutHandler}
                onClick={() => setSelected(name)}
            >
                <StandardMesh name={name} color={color} selected={selected} />
            </Select>
            {hovered === name && <BoxDimension name={name}/>}
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
                edgeStrength={2}
                width={1000}
                height={1000}
                visibleEdgeColor={visibleEdgeColor}
            />
        </EffectComposer>
    );
}
