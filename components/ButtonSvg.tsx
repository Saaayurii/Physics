"use client";

import React, { FC, useRef, useLayoutEffect, useState } from "react";

interface ButtonSvgProps {
  white?: boolean;
}

const ButtonSvg: FC<ButtonSvgProps> = ({ white }) => {
  const ref = useRef<HTMLDivElement>(null);
  const {0:width, 1:setWidth} = useState(100); // default viewBox width

  useLayoutEffect(() => {
    if (ref.current) {
      const container = ref.current.parentElement;
      if (container) {
        const resize = () => {
          // 🧠 Фикс: округление до целого и min(0)
          const w = Math.max(Math.round(container.getBoundingClientRect().width - 42), 0);
          setWidth(w);
        };
        resize();

        const observer = new ResizeObserver(resize);
        observer.observe(container);
        return () => observer.disconnect();
      }
    }
  }, []);

  return (
    <div
      ref={ref}
      className="absolute flex h-full w-full pointer-events-none z-0"
      style={{ overflow: "hidden" }} // 🧠 дополнительный safeguard
    >
      {/* Left cap */}
      <svg
        width="21"
        height="44"
        viewBox="0 0 21 44"
        className="shrink-0"
        style={{ display: "block" }} // 🧠 Убрать inline-svg глитчи
      >
        <path
          fill={white ? "white" : "none"}
          stroke={white ? "white" : "url(#btn-left)"}
          strokeWidth="2"
          d="M21,43.00005 L8.11111,43.00005 C4.18375,43.00005 1,39.58105 1,35.36365 L1,8.63637 C1,4.41892 4.18375,1 8.11111,1 L21,1"
        />
      </svg>

      {/* Middle dynamic */}
      <svg
        viewBox={`0 0 ${width} 44`}
        preserveAspectRatio="none"
        width={width}
        height="44"
        className="block" // 🧠 Не даёт браузеру вставить зазор
        style={{ display: "block", flexShrink: 0 }}
      >
        {white ? (
          <polygon
            fill="white"
            fillRule="nonzero"
            points={`0,0 ${width},0 ${width},44 0,44`}
          />
        ) : (
          <>
            <polygon
              fill="url(#btn-top)"
              fillRule="nonzero"
              points={`0,0 ${width},0 ${width},2 0,2`}
            />
            <polygon
              fill="url(#btn-bottom)"
              fillRule="nonzero"
              points={`0,42 ${width},42 ${width},44 0,44`}
            />
          </>
        )}
      </svg>

      {/* Right cap */}
      <svg
        width="21"
        height="44"
        viewBox="0 0 21 44"
        className="shrink-0"
        style={{ display: "block" }}
      >
        <path
          fill={white ? "white" : "none"}
          stroke={white ? "white" : "url(#btn-right)"}
          strokeWidth="2"
          d="M0,43.00005 L5.028,43.00005 L12.24,43.00005 C16.526,43.00005 20,39.58105 20,35.36365 L20,16.85855 C20,14.59295 18.978,12.44425 17.209,10.99335 L7.187,2.77111 C5.792,1.62675 4.034,1 2.217,1 L0,1"
        />
      </svg>
    </div>
  );
};

export default ButtonSvg;
