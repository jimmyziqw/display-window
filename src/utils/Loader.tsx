// import { useProgress } from "@react-three/drei";
// import { useEffect, useState } from "react";

// export default function LoadingScreen() {
//   const { active, progress } = useProgress();
//   const [displayProgress, setDisplayProgress] = useState(0);

//   useEffect(() => {
//     if (active) {
//       const timeout = setTimeout(() => setDisplayProgress(progress), 50);
//       return () => clearTimeout(timeout);
//     } else {
//       setDisplayProgress(100); // Ensure the bar completes
//       const timeout = setTimeout(() => setDisplayProgress(0), 500); // Reset for next load
//       return () => clearTimeout(timeout);
//     }
//   }, [progress, active]);

//   if (!active && displayProgress === 0) return null;

//   return (
//     <div style={styles.loadingScreen}>
//       <div>Loading... {Math.round(displayProgress)}%</div>
//       <div style={styles.progressBar}>
//         <div style={{ ...styles.progress, width: `${displayProgress}%` }} />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   loadingScreen: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     color: 'white',
//     fontSize: '1.5em',
//     zIndex: 1000,
//   },
//   progressBar: {
//     width: '80%',
//     height: '30px',
//     background: 'gray',
//     borderRadius: '15px',
//     overflow: 'hidden',
//     marginTop: '20px',
//   },
//   progress: {
//     height: '100%',
//     background: 'limegreen',
//     transition: 'width 0.5s ease-in-out', // Smooth transition
//   },
// };
