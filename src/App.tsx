import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense} from "react";
import {  Preload, useGLTF } from "@react-three/drei";
// import CustomControl from "./utils/CustomControl.tsx";
import Scene from "./Scene.tsx";
import gsap from "gsap";
import DirectionalLight from "./components/DirectionalLight.tsx";

useGLTF.preload("models/model.glb");

export default function App() {
    return (
        <>
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
                <DirectionalLight name="primary" />
                <DirectionalLight name="secondary" />
                <ambientLight intensity={0.5} />
                <Suspense fallback={null}>
                    <Preload all />
                    <Scene />
                </Suspense>
                <CameraControl />
                {process.env.NODE_ENV === "development" && <axesHelper position={[0, 0, 0]} />}
            </Canvas>
            {/* <Loader /> */}
        </>
    );
}

function flatCenter(x: number, cameraMoveThreshold = 0.3) {
    //       ___/
    //      /
    if (x >= -1 && x < -cameraMoveThreshold) {
        return x + cameraMoveThreshold;
    } else if (x >= -cameraMoveThreshold && x <= cameraMoveThreshold) {
        return 0;
    } else if (x > cameraMoveThreshold && x <= 1) {
        return x - cameraMoveThreshold;
    } else {
        throw new Error("Input out of range. x should be in the range [-1, 1].");
    }
}

function CameraControl() {
    //pointer xy are NDC in [-1,1]
    //center area has no movement control, product preview area,
    //pherial area control camera orbital motion
    useFrame((state, _) => {
        const targetPosition = {
            
            x: -flatCenter(state.pointer.x) / 2,
            y: -flatCenter(state.pointer.y) + 0.8 / 2,
            z: 4.0,
        };
        gsap.to(state.camera.position, {
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            duration: 0.5,
            onUpdate: () => {
                state.camera.lookAt(0, 0, 0);
            },
        });
    });
    return null;
}
