import React from 'react';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { arrowRightIcon } from 'app/components/SVGIcons/arrows';
import { DetailsText, DetailsWrapper } from './styles';

interface IProps {
  dataItem: any;
  onClick: (item: any) => void;
}

const DetailsButton: React.FC<IProps> = ({ dataItem, onClick }) => {
  const onOpen = () => {
    onClick(dataItem);
  };

  return (
    <DetailsWrapper onClick={onOpen}>
      <DetailsText>View details</DetailsText>
      <IconWrapper width="12px" height="12px" icon={arrowRightIcon(10, 'var(--_pButtonBg)')} />
    </DetailsWrapper>
  );
};

export default React.memo(DetailsButton);
