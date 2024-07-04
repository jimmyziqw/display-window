import { useCallback, useState } from "react";
import Background from "./components/Background.tsx";
import useRespondAspectChange from "./utils/useRespondAspectChange.ts";
import { StandardMesh } from "./components/StandardMesh.tsx";
import { Carousel } from "./components/Carousel";
import { ThreeEvent } from "@react-three/fiber";
import { debounce } from "lodash";
import { BoxDimension } from "./components/DoubleSidedArrow.tsx";
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

    const meshNames = ["desk", "lamp", "blossomBase", "coffeeCup", "window", "laptopBack"];
    return (
        <>
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
            <StandardMesh
                name={name}
                color={color}
                selected={selected}
                onClick={() => setSelected(name)}
                onPointerOver={pointerOverHandler(name)}
                onPointerOut={pointerOutHandler}
            />

            {hovered === name && <BoxDimension name={name} />}
            {selected === name && <Carousel name={name} setColor={setColor} />}
        </>
    );
}
