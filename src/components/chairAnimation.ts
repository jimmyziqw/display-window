// import gsap from "gsap";
// import * as THREE from "three";
// import scene from "../data/sceneTransition.ts";

// export const schoolPosition = new THREE.Vector3(0.0, 0.5, 1.0);
// const degToRad = (x: number) => (x * Math.PI) / 180;
// const intro = {
//   rotation: { y: degToRad(0) },
//   position: { x: 0.0, z: 0.0 },
// };
// const desk = {
//   rotation: { y: degToRad(90) },
//   position: { x: -1.25, z: -1.0 },
// };
// const enersion = {
//   rotation: { y: degToRad(60) },
//   position: { x: -0.8, z: 0.0 },
// };

// const school = {
//   rotation: { y: degToRad(0) },
//   position: { x: 0.0, z: 0.5 },
// };

// export default function chairAnimation(mesh: THREE.Mesh, level: number, isProceeding: boolean) {
//   if (!mesh) return;
//   const material = mesh.material as THREE.MeshStandardMaterial;
//   const tl = gsap.timeline({
//     ease: "power.in",
//     duration: 0.2,
//     onUpdate: () => {
//       material.needsUpdate = true;

//     }
//   });
  
//   if (level === scene.desk-1 && isProceeding === false){
//     tl.to(mesh.rotation, intro.rotation, 0);
//     tl.to(mesh.position, intro.position, 0);
//   } 
//   // deskSpawn
//   const proceedToDeskSpawn = level === scene.desk && isProceeding === true;
//   const fallbackToDeskSpawn = level === scene.enersion - 1 && isProceeding === false;
//   if (proceedToDeskSpawn || fallbackToDeskSpawn) {
//     tl.to(mesh.rotation, desk.rotation, 0);
//     tl.to(mesh.position, desk.position, 0);
//   }
//   //  -----------------enersion-------------------------
//   const proceedToMiddleScene = level === scene.enersion && isProceeding === true;
//   const fallbackToMiddleScene = level === scene.school - 1 && isProceeding === false;

//   if (proceedToMiddleScene || fallbackToMiddleScene) {
//     tl.to(mesh.rotation, enersion.rotation, 0);
//     tl.to(mesh.position, enersion.position, 0);
//   }

//   //--------------------school----------------------
//   else if (level === scene.school && isProceeding === true) {
//     tl.to(mesh.rotation, school.rotation, 0);
//     tl.to(mesh.position, school.position, 0);
//   }
// }
