

// TagLine.tsx
import React, { FC } from 'react';
import Brackets from "@/public/assets/svg/Brackets";

interface TagLineProps {
  className?: string;
  children: React.ReactNode;
}

const TagLine: FC<TagLineProps> = ({ className, children }) => {
  return (
    <div className={`tagline flex items-center ${className || ""}`}>
      <Brackets position="left" />
      <div className="mx-3 text-n-3">{children}</div>
      <Brackets position="right" />
    </div>
  );
};

export default TagLine;
