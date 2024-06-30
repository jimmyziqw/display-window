// import { useRef } from "react";
// import useParticlizing from "../hooks/useParticlizing.ts";
// import useModels from "../hooks/useModels.ts";
// import TransitionalGroup from "./MeshTransition.tsx";
// import StandardMeshGroup from "./StandardMesh.tsx";
// import useMeshAnimation from "../hooks/useMeshAnimation.ts";

// type objectSetProps = {
//   name: string;
//   animation?: any;
//   texture?: THREE.Texture | null;
//   transition?: boolean;
//   children?: any;
// };

// export default function ItemSet({
//   name,
//   animation,
//   texture = null,
// }: objectSetProps) {
//   // const delay = transition? 500 : 0;
//   // const { isVisible, isParticlizing } = useParticlizing(span, delay);
//   const groupRef = useRef(null);
//   const objects = useModels(name);

//   useMeshAnimation(groupRef, name, animation);

//   return (
//     <>
//       <StandardMeshGroup
//         groupRef={groupRef}
//         objects={objects}
//         texture={texture}
//       />
//     </>
//   );
// }
