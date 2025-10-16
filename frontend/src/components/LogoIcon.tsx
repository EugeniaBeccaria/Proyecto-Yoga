// src/components/LogoIcon.tsx

import React from 'react';
import LogoSVG from '../assets/Logo.svg?react';

interface LogoIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ size = 40, color, className }) => {
  return (
    <LogoSVG
      width={size}
      height={size}
      className={className}
      style={{ color: color }}
    />
  );
};

export default LogoIcon;