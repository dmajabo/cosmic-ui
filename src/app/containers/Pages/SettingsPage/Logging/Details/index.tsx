import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { format } from 'date-fns';
import React from 'react';
import { Wrapper, Header, FormTitle, FormContent } from '../../Components/FormStyles/FormStyles';
import { DetailsRowsWrapper } from '../../Components/styles';
import { LoggingGridColumns } from '../models';
import DetailsFieldRow from './DetailsFieldRow';

interface IProps {
  dataItem: any;
  onClose: () => void;
}

const Details: React.FC<IProps> = ({ dataItem, onClose }) => {
  if (!dataItem) return null;
  return (
    <Wrapper>
      <Header>
        <FormTitle>Log Details</FormTitle>
        <IconWrapper styles={{ position: 'absolute', top: '20px', right: '20px' }} icon={closeSmallIcon} onClick={onClose} />
      </Header>
      <FormContent>
        <DetailsRowsWrapper>
          <DetailsFieldRow label="Date/Time" value={dataItem[LoggingGridColumns.time.resField]} format={v => format(Number(v), `EEE',' LLL d',' yyyy HH:mm aa`)} />
          <DetailsFieldRow label="Edge" value={dataItem[LoggingGridColumns.edge.resField]} />
          <DetailsFieldRow label="Operation" value={dataItem[LoggingGridColumns.operation.resField]} />
          <DetailsFieldRow label="ID" value={dataItem.id} />
          <DetailsFieldRow label="User" value={dataItem[LoggingGridColumns.user.resField]} />
        </DetailsRowsWrapper>
      </FormContent>
    </Wrapper>
  );
};

export default React.memo(Details);
