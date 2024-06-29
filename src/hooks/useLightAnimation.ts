// import { useEffect, useMemo } from "react";
// import gsap from "gsap";
// import { useLevelContext } from "./useLevelContext";
// import getLightStates, { hexToRgb } from "../data/lightInterpolation";

// const duration = 0.8;

// export default function useLightAnimation(lightRef: any, name: any) {
//   // const { level } = useLevelContext();
//   const lightStates = useMemo(() => getLightStates(name), []);
//   useEffect(() => {
//     const light = lightRef.current;
//     if (!light) return;
//     const targetState = lightStates[level];
//     console.log(targetState.pos)
//     const tl = gsap.timeline({});
//     tl.to(
//       light,
//       {
//         intensity: targetState.intensity,
//         duration,
//       },
//       "<"
//     );
//     if (targetState.pos) {
//       tl.to(
//         light.position,
//         {
//           x: targetState.pos[0],
//           y: targetState.pos[1],
//           z: targetState.pos[2],
//           duration,
//         },
//         "<"
//       );
//     }
//     if (!targetState || !targetState.color) return;
//     if (
//       targetState.color &&
//       targetState.color !== targetState.color[level - 1]
//     ) {
//       const rgb = hexToRgb(targetState.color);
//       tl.to(
//         light.color,
//         {
//           r: rgb[0] / 255,
//           g: rgb[1] / 255,
//           b: rgb[2] / 255,
//           duration,
//         },
//         "<"
//       );
//     }
//   }, [level]);
// }
