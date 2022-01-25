import React from 'react';

interface LegendIconProps {
  readonly colour: string;
}

export const LegendIcon: React.FC<LegendIconProps> = ({ colour }) => {
  return (
    <svg width="16" height="16">
      <rect rx="4" ry="4" width="16" height="16" fill={colour} />
    </svg>
  );
};
