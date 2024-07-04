import { Line } from "@react-three/drei";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const color = "white";

export function BoxDimension({name}: {name: string}) {
    const padding = 0.05;
    const {scene} = useThree()
    const mesh = scene.getObjectByName(name)
    if (!mesh) return null
    
    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const minPoint = boundingBox.min;
    const maxPoint = boundingBox.max;
    const width = maxPoint.x - minPoint.x;
    const height = maxPoint.y - minPoint.y;
  
   
    return (
        <>
            <DoubleSidedArrow length={width} position={[(maxPoint.x+minPoint.x)*0.5,maxPoint.y+padding,(maxPoint.z+minPoint.z)*0.5]}/>
            <DoubleSidedArrow length={height} position={[maxPoint.x+padding,(maxPoint.y+minPoint.y)*0.5,(maxPoint.z+minPoint.z)*0.5]} rotation={[0,0, -Math.PI/2]}/>
        </>


    )
}

export function DoubleSidedArrow({length, ...prop}:any) {
    const arrowWidth = 0.05;
    // const content = "hell";
    const empiricalScaler = 0.03; 
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
            <Text color={color} anchorX="center" anchorY="middle" fontSize={0.06}>
                {content}
            </Text>
        </group>     
    );
}

