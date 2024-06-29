import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GUI } from "lil-gui";

let gui: GUI;

if (process.env.NODE_ENV === "development") {
    gui = new GUI();
}
export default function DirectionalLight({ name = "light" }) {
    const lightRef = useRef<THREE.DirectionalLight>(null);
    const params = {
        color: "#b9bfb5",
        x: -1.8,
    };

    useEffect(() => {
        if (process.env.NODE_ENV == "development" && gui) {
            gui.addColor(params, "color")
                .name(name)
                .onChange((value: string) => {
                    if (lightRef.current) lightRef.current.color.set(value);
                });
            gui.add(params, "x", -10, 10, 0.1)
                .name(`${name} Position X`)
                .onChange((value: number) => {
                    if (lightRef.current) lightRef.current.position.x = value;
                });
            return () => {
                gui.destroy();
            };
        }
    }, [params]);

    return (
        <directionalLight
            ref={lightRef}
            name={name}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-bias={-0.01}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={4}
            shadow-camera-bottom={-2}
            shadow-camera-near={0.01}
            shadow-camera-far={6}
            position={[-1.8, 1.4, 2]}
            color={"#b9bfb5"}
            intensity={4.0}
        />
    );
}
