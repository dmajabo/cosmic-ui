import { pagingNextArrow, pagingPrewArrow } from 'app/components/SVGIcons/arrows';
import React from 'react';

interface Props {
  y: number;
  width: number;
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const SitePager: React.FC<Props> = (props: Props) => {
  return (
    <foreignObject x="0" y={props.y} height="20" width={props.width}>
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <span onClick={props.onPrev} style={{ cursor: 'pointer', width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0 0' }}>
          {pagingNextArrow}
        </span>
        <span style={{ display: 'inline-block', color: 'var(--_primaryTextColor)', fontSize: '10px', lineHeight: '12px', margin: 'auto' }}>
          {props.currentPage + 1} / {props.totalPages}
        </span>
        <span onClick={props.onNext} style={{ cursor: 'pointer', width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 0 auto' }}>
          {pagingPrewArrow}
        </span>
      </div>
    </foreignObject>
  );
};

export default React.memo(SitePager);
