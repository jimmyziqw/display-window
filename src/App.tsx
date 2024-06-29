import { Canvas } from "@react-three/fiber";
import { useRef, Suspense, useState } from "react";
import useStats from "./utils/useStats.ts";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
// import CustomControl from "./utils/CustomControl.tsx";
import Scene from "./Scene.tsx";
// import DirectionalLight from "./components/DirectionalLight.tsx";
// import AmbientLight from "./components/AmbientLight.tsx";
import Loader from "./utils/Loader.tsx";
useGLTF.preload("models/model.glb");

export default function App() {
    return (
        <>
            {/* <App2/> */}
            <Canvas
                frameloop="always"
                shadows 
                dpr={[1, 1.5]}
                camera={{
                    position: [0, 0.2, 3.3],
                    rotation: [Math.PI / 2, 0, 0],
                    fov: 40,
                }}
            >
                <OrbitControls />
                <Suspense fallback={null}>
                    <Preload all />
                    <Scene />
                    
                </Suspense>
                {process.env.NODE_ENV === "development" && <axesHelper position={[0, 0, 0]} />}
            </Canvas>
            {/* <Leva/> */}
            {/* <Loader setProgress={setProgress} /> */}
        </>
    );
}
