import { useState, useEffect } from "react";
import { useLevelContext } from "./useLevelContext";

export type LevelSpan = { createAt: number[]; deleteAt: number[] };
export type Particlizing = "integrate" | "dissolve" | null;

export default function useTransition(span: LevelSpan | number[], duration: number = 500) {
  // simulate overload: number[] => levelSpan
  let levelSpan: LevelSpan;
  if (span instanceof Array) {
    levelSpan = {
      createAt: span.filter((_, i) => i % 2 == 0),
      deleteAt: span.filter((_, i) => i % 2 == 1),
    };
  } else if (isLevelSpan(span)) {
    levelSpan = span;
  }

  const { level, isProceeding } = useLevelContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isParticlizing, setIsParticlizing] = useState<Particlizing>(null);

  useEffect(() => {
    const oneSpan = levelSpan.createAt[0] <= level && levelSpan.deleteAt.length === 0;
    const halfSpan = levelSpan.createAt[0] <= level && level < levelSpan.deleteAt[0];
    const oneHalfSpan = levelSpan.createAt[1] <= level && levelSpan.deleteAt.length === 1;
    const twoSpan = levelSpan.createAt[1] <= level && level < levelSpan.deleteAt[1];
    const checkVisibility = () => setIsVisible(halfSpan || oneSpan || oneHalfSpan || twoSpan);

    levelSpan.createAt.forEach((createAtLevel) => {
      if (level === createAtLevel - 1 && !isProceeding) {
        duration = 0;
        setIsParticlizing("dissolve"); // reverse creation
      } else if (level === createAtLevel && isProceeding) {
        setIsParticlizing("integrate"); // create
      }
    });

    levelSpan.deleteAt.forEach((deleteAtLevel) => {
      if (level === deleteAtLevel - 1 && !isProceeding) {
        setIsParticlizing("integrate"); //reverse delete
      } else if (level === deleteAtLevel && isProceeding) {
        duration = 0;
        setIsParticlizing("dissolve"); //delete
      }
    });
    const timer = setTimeout(checkVisibility, duration);
    return () => clearTimeout(timer);
  }, [level, isProceeding]);

  useEffect(() => {
    if (isParticlizing) {
      const timer = setTimeout(() => {
        setIsParticlizing(null);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isParticlizing]);

  return { isVisible, isParticlizing };
}

function isLevelSpan(span: any): span is LevelSpan {
  return span && Array.isArray(span.createAt) && Array.isArray(span.deleteAt);
}
