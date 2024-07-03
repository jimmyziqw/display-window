import { Line } from "@react-three/drei";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { mx_bits_to_01 } from "three/examples/jsm/nodes/materialx/lib/mx_noise.js";
import { useThree } from "@react-three/fiber";
const radius = 1;
const height = 1;
const thickness = 0.01;
const length = 2;
const color = "white";
const centerPosition = new THREE.Vector3(0, 0, 0);

export function BoxDimension({name}) {
    const padding = 0.05;
    const {scene} = useThree()
    const mesh = scene.getObjectByName(name)
    if (!mesh) return null
    
    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const minPoint = boundingBox.min;
    const maxPoint = boundingBox.max;
    const width = maxPoint.x - minPoint.x;
    const height = maxPoint.y - minPoint.y;
    console.log(mesh, "mesh")
    console.log('Min Point:', minPoint);
    console.log('Max Point:', maxPoint);
   
    return (
        <>
            <DoubleSidedArrow length={width} position={[(maxPoint.x+minPoint.x)*0.5,maxPoint.y+padding,0]}/>
            <DoubleSidedArrow length={height} position={[maxPoint.x+padding,(maxPoint.y+minPoint.y)*0.5,0]} rotation={[0,0, -Math.PI/2]}/>

        </>


    )
}

export function DoubleSidedArrow({length, ...prop}:any) {
    const arrowWidth = 0.05;
    // const content = "hell";
    const empiricalScaler = 0.05; 
    const content = (length*3.28).toFixed(1) + "'";
    const bodyLength = 0.5 * (length - empiricalScaler * content.length);
    return (
        <group {...prop} >
            <Line
                points={[[-length * 0.5, 0, 0],[-length * 0.5 + bodyLength, 0, 0]]}
                color={color}
            />
            <Line
                points={[[length * 0.5, 0, 0],[length * 0.5 - bodyLength, 0, 0]]}
                color={color}
            />
            <Line
                points={[[-length * 0.5, -arrowWidth * 0.5, 0],[-length * 0.5, arrowWidth * 0.5, 0]]}
                color={color}
            />
            <Line
                points={[[length * 0.5, -arrowWidth * 0.5, 0],[length * 0.5, arrowWidth * 0.5, 0]]}
                color={color}
            />
            <Text color={color} anchorX="center" anchorY="middle" fontSize={0.05}>
                {content}
            </Text>
        </group>     
    );
}

