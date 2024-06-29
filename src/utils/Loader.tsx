import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export default function LoadingScreen({ setProgress }: any) {
  const { active,  item, loaded } = useProgress();
  const total = 25; //TODO: fix shortcut, centralize loading model and material
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setProgress(loaded / total);  
      }, 50);

      
      return () => clearTimeout(timer);
    }
  }, [active, loaded ]);
  if (process.env.NODE_ENV == 'development') {
    console.log(active, item, loaded,  "progress");
  }
  
  if (!active) setTimeout(()=>{setProgress(loaded/total)}, 50);
  return null;

}
