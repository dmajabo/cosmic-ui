import React from 'react';
import { Container, ItemContainer, ItemTitle, ItemLink, ItemValue } from './AboutStyles';
import { APP_GENERAL_CONST } from 'lib/constants/general';
import { format } from 'date-fns';

interface Props {}

const AboutComponent: React.FC<Props> = (props: Props) => {
  const [version, setVersion] = React.useState<string>('');
  const [latestSuccessTime, setLatestSuccessTime] = React.useState<string>('');

  React.useEffect(() => {
    const _v = process.env.REACT_APP_VERSION || null;
    let _t = process.env.REACT_APP_DEPLOYED_AT || null;
    if (_t && Number(_t)) {
      _t = format(Number(process.env.REACT_APP_DEPLOYED_AT), `EEE',' LLL d',' yyyy HH:mm aa`);
    }
    setVersion(_v);
    setLatestSuccessTime(_t);
  }, []);

  return (
    <Container>
      <ItemContainer>
        <ItemTitle>Support:</ItemTitle>
        <ItemLink>
          <a href={`mailto:${APP_GENERAL_CONST.support}`}>{APP_GENERAL_CONST.support}</a>
        </ItemLink>
      </ItemContainer>
      <ItemContainer>
        <ItemTitle>Feedback:</ItemTitle>
        <ItemLink>
          <a href={`mailto:${APP_GENERAL_CONST.feedback}`}>{APP_GENERAL_CONST.feedback}</a>
        </ItemLink>
      </ItemContainer>
      <ItemContainer>
        <ItemTitle>Version:</ItemTitle>
        <ItemValue>
          {version} {latestSuccessTime ? `(${latestSuccessTime})` : null}
        </ItemValue>
      </ItemContainer>
    </Container>
  );
};

export default React.memo(AboutComponent);
