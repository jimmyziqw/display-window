import useNode from "../hooks/useNode";
import ParticleSystem from "../components/ParticleSystem";

export default function Flower() {
  const leaf = useNode("flowerLeaf1");
  const base = useNode("flowerStem");
  const other = useNode("flowerPot");


  if (!leaf || !base || !other) return null;

  return (
    <group >
      <ParticleSystem
        baseObject={base}
        particle={leaf}
        position={base.position}
      />
      <mesh
        geometry={base.geometry}
        material={base.material}
        position={base.position}
      />
      <mesh
        geometry={other.geometry}
        material={other.material}
        position={other.position}
      />
    </group>
  );
}
