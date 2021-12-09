import React from 'react';

interface LegendLineProps {
  readonly colour: string;
}

export const LegendLine: React.FC<LegendLineProps> = ({ colour }) => {
  return (
    <svg width="32" height="11" viewBox="0 0 32 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 10L8.5 4L16.5 8L31.5 1" stroke={colour} strokeWidth="2" />
    </svg>
  );
};
