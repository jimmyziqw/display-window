// const Effects = ({ selectedLayer }) => {
//     const { gl, scene, camera, size } = useThree();
  
//     const composer = useMemo(() => {
//       const renderTarget = new THREE.WebGLRenderTarget(size.width, size.height);
//       const composer = new EffectComposer(gl, renderTarget);
//       const outlinePass = new OutlinePass(new THREE.Vector2(size.width, size.height), scene, camera);
//       outlinePass.visibleEdgeColor.set(0xffffff); // Setting the color using a hexadecimal number
//       outlinePass.hiddenEdgeColor.set(0x22090a); // Optionally set a hidden edge color
  
//       composer.addPass(outlinePass);
//       return composer;
//     }, [gl, scene, camera, size, selectedLayer]);
  
//     useFrame(() => {
//       camera.layers.set(selectedLayer);
//       composer.render();
//       camera.layers.set(0); // Reset to default layer after rendering
//     }, 1);
  
//     return null;
//   };