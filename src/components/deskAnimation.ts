// import gsap from "gsap";
// import * as THREE from "three";
// import scene from "../data/sceneTransition.ts";

// export const schoolPosition = new THREE.Vector3(0.0, 0.5, 1.0);

// const intro = {
//   color: hexToRGB("#D9A589"),
//   scale: { z: 1.0 },
// };
// const enersion = {
//   color: hexToRGB("#1B1E22"),
//   scale: { z: 3.0 },
// };

// const school = {
//   color: hexToRGB("#D9A589"),
//   scale: { z: 1.0 },
// };

// export default function DeskAnimation(
//   mesh: THREE.Mesh,
//   level: number,
//   isProceeding: boolean
// ) {
//   if (!mesh) return;
//   const material = mesh.material as THREE.MeshStandardMaterial;
//   const tl = gsap.timeline({
//     ease: "power.in",
//     duration: 0.5,
//     onUpdate: () => {
//       material.needsUpdate = true;
//     },
//   });
//   if (level === scene.enersion - 1 && isProceeding === false) {
//     // tl.to(mesh.position, intro.position, 0);
//     tl.to(mesh.scale, intro.scale, 0);
//     tl.to(material.color, intro.color, 0);
//   }
//   //  -----------------enersion-------------------------
//   const proceedToMiddleScene =
//     level === scene.enersion && isProceeding === true;
//   const fallbackToMiddleScene =
//     level === scene.school - 1 && isProceeding === false;

//   if (proceedToMiddleScene || fallbackToMiddleScene) {
//     // tl.to(mesh.position, enersion.position, 0);
//     tl.to(mesh.scale, enersion.scale, 0);
//     tl.to(material.color, enersion.color, 0);
//   }

//   //--------------------school----------------------
//   else if (level === scene.school && isProceeding === true) {
//     // tl.to(mesh.position, school.position, 0);
//     tl.to(mesh.scale, school.scale, 0);
//     tl.to(material.color, school.color, 0);
//   }
// }

// function hexToRGB(hex: string) {
//   const color = new THREE.Color(hex);
//   return {
//     r: color.r,
//     g: color.g,
//     b: color.b,
//   };
// }
