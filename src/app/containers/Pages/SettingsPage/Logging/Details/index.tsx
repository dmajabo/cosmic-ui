import IconWrapper from 'app/components/Buttons/IconWrapper';
import { GridCellStatusCircle } from 'app/components/Grid/styles';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import { parseFieldAsDate } from 'lib/helpers/general';
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
          <DetailsFieldRow label="Date / Time" value={dataItem[LoggingGridColumns.timestamp.resField]} format={v => parseFieldAsDate(v, `EEE',' LLL d',' yyyy HH:mm aa`)} />
          <DetailsFieldRow label={LoggingGridColumns.tenantId.label} value={dataItem[LoggingGridColumns.tenantId.resField]} />
          <DetailsFieldRow label={LoggingGridColumns.userName.label} value={dataItem[LoggingGridColumns.userName.resField]} />
          <DetailsFieldRow label={LoggingGridColumns.userEmail.label} value={dataItem[LoggingGridColumns.userEmail.resField]} />
          <DetailsFieldRow label={LoggingGridColumns.userIP.label} value={dataItem[LoggingGridColumns.userIP.resField]} />
          <DetailsFieldRow label={LoggingGridColumns.serviceName.label} value={dataItem[LoggingGridColumns.serviceName.resField]} />
          <DetailsFieldRow
            label={LoggingGridColumns.respStatusCode.label}
            value={dataItem[LoggingGridColumns.respStatusCode.resField]}
            valueCellStyles={{ display: 'inline-flex', flexShrink: 0, alignItems: 'center' }}
            customValue={
              <>
                {(dataItem[LoggingGridColumns.respStatusCode.resField] === '200' ||
                  dataItem[LoggingGridColumns.respStatusCode.resField] === 200 ||
                  (dataItem[LoggingGridColumns.respStatusCode.resField] >= 200 && dataItem[LoggingGridColumns.respStatusCode.resField] < 300)) && <GridCellStatusCircle color="var(--_successColor)" />}
                {(dataItem[LoggingGridColumns.respStatusCode.resField] === '500' ||
                  dataItem[LoggingGridColumns.respStatusCode.resField] === 500 ||
                  dataItem[LoggingGridColumns.respStatusCode.resField] >= 500) && <GridCellStatusCircle color="var(--_errorColor)" />}
                {(dataItem[LoggingGridColumns.respStatusCode.resField] === '400' ||
                  dataItem[LoggingGridColumns.respStatusCode.resField] === 400 ||
                  (dataItem[LoggingGridColumns.respStatusCode.resField] >= 400 && dataItem[LoggingGridColumns.respStatusCode.resField] < 400)) && <GridCellStatusCircle color="var(--_errorColor)" />}
                <span>{dataItem[LoggingGridColumns.respStatusCode.resField]}</span>
              </>
            }
          />
          <DetailsFieldRow label={LoggingGridColumns.reqUrl.label} value={dataItem[LoggingGridColumns.reqUrl.resField]} />
          <DetailsFieldRow label={LoggingGridColumns.reqType.label} value={dataItem[LoggingGridColumns.reqType.resField]} />
          {dataItem[LoggingGridColumns.reqBody.resField] && <DetailsFieldRow label={LoggingGridColumns.reqBody.label} value={dataItem[LoggingGridColumns.reqBody.resField]} />}
        </DetailsRowsWrapper>
      </FormContent>
    </Wrapper>
  );
};

export default React.memo(Details);
