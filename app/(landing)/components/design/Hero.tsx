import PlusSvg from "@/public/assets/svg/PlusSvg";
import React, { FC, useState, useEffect, useMemo } from "react";
import { MouseParallax } from "react-just-parallax";

// Константы для конфигурации
const RING_SIZES = [65.875, 51.375, 36.125, 23.125] as const;
const PARALLAX_STRENGTH = 0.07;

// Типы для конфигурации орбов
interface OrbConfig {
  size: number;
  rotation: number;
  marginTop: number;
  marginLeft: number;
  gradient: readonly [string, string];
  className?: string;
}

// Конфигурация орбов
const ORB_CONFIGS: readonly OrbConfig[] = [
  {
    size: 2,
    rotation: 46,
    marginTop: -144, // -mt-36 = -144px
    marginLeft: -4,  // -ml-1 = -4px
    gradient: ["#DD734F", "#1A1A32"] as const,
  },
  {
    size: 4,
    rotation: -56,
    marginTop: -128, // -mt-32 = -128px
    marginLeft: -4,
    gradient: ["#DD734F", "#1A1A32"] as const,
  },
  {
    size: 4,
    rotation: 54,
    marginTop: 206, // mt-[12.9rem] ≈ 206px
    marginLeft: -4,
    gradient: ["#B9AEDF", "#1A1A32"] as const,
    className: "hidden xl:block",
  },
  {
    size: 3,
    rotation: -65,
    marginTop: 208, // mt-52 = 208px
    marginLeft: -6,  // -ml-1.5 = -6px
    gradient: ["#B9AEDF", "#1A1A32"] as const,
  },
  {
    size: 6,
    rotation: -85,
    marginTop: -12, // -mt-3 = -12px
    marginLeft: -12, // -ml-3 = -12px
    gradient: ["#88E5BE", "#1A1A32"] as const,
  },
  {
    size: 6,
    rotation: 70,
    marginTop: -12,
    marginLeft: -12,
    gradient: ["#88E5BE", "#1A1A32"] as const,
  },
] as const;

// Мемоизированные компоненты
export const Gradient = React.memo(() => (
  <>
    <div className="relative z-1 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
    <div className="relative z-1 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
  </>
));

export const BottomLine = React.memo(() => (
  <>
    <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 pointer-events-none xl:block" />
    <PlusSvg className="hidden absolute top-[54.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block" />
    <PlusSvg className="hidden absolute top-[54.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block" />
  </>
));

const Rings = React.memo(() => (
  <>
    {RING_SIZES.map((size, index) => (
      <div
        key={size}
        className="absolute top-1/2 left-1/2 aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ width: `${size}rem` }}
      />
    ))}
  </>
));

// Отдельный компонент для орба
const Orb = React.memo<{ config: OrbConfig; isVisible: boolean }>(
  ({ config, isVisible }) => {
    const { size, rotation, marginTop, marginLeft, gradient, className = "" } = config;
    
    const orbStyle = useMemo(() => ({
      width: `${size * 4}px`,  // Tailwind: w-2 = 8px, w-4 = 16px, etc.
      height: `${size * 4}px`,
      marginTop: `${marginTop}px`,
      marginLeft: `${marginLeft}px`,
      backgroundImage: `linear-gradient(to bottom, ${gradient[0]}, ${gradient[1]})`,
    }), [size, marginTop, marginLeft, gradient]);

    const containerStyle = useMemo(() => ({
      transform: `rotate(${rotation}deg)`,
    }), [rotation]);

    return (
      <div
        className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom"
        style={containerStyle}
      >
        <div
          className={`rounded-full transition-transform duration-500 ease-out ${className} ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={orbStyle}
        />
      </div>
    );
  }
);

// Компонент орбов
const ParallaxOrbs = React.memo<{ 
  parallaxRef: React.RefObject<any>; 
  isVisible: boolean; 
}>(({ parallaxRef, isVisible }) => (
  <MouseParallax strength={PARALLAX_STRENGTH} parallaxContainerRef={parallaxRef}>
    {ORB_CONFIGS.map((config, index) => (
      <Orb key={index} config={config} isVisible={isVisible} />
    ))}
  </MouseParallax>
));

// Основной компонент
interface BackgroundCirclesProps {
  parallaxRef: React.RefObject<any>;
}

const BackgroundCircles: FC<BackgroundCirclesProps> = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem]">
      <Rings />
      <ParallaxOrbs parallaxRef={parallaxRef} isVisible={mounted} />
    </div>
  );
};

// Добавляем display names для лучшей отладки
Gradient.displayName = "Gradient";
BottomLine.displayName = "BottomLine";
Rings.displayName = "Rings";
Orb.displayName = "Orb";
ParallaxOrbs.displayName = "ParallaxOrbs";

export default BackgroundCircles;