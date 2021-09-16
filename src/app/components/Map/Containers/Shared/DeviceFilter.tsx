import React from 'react';

interface IProps {
  id: string;
}
const DeviceFilter: React.FC<IProps> = (props: IProps) => {
  return (
    <filter id={props.id} x="0.140625" y="0.589844" width="85.5067" height="87.8368" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
      <feOffset dy="20" />
      <feGaussianBlur stdDeviation="15" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.0196078 0 0 0 0 0.0784314 0 0 0 0 0.227451 0 0 0 0.05 0" />
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
    </filter>
  );
};

export default React.memo(DeviceFilter);
