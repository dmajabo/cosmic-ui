import IconWrapper from 'app/components/Buttons/IconWrapper';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import React from 'react';
import { Tag, TagItemWrapper } from './styles';

function TagItem(props) {
  const onClick = e => {
    props.onDelete(e);
  };
  return (
    <TagItemWrapper {...props}>
      <Tag>{props.tagValue}</Tag>
      <IconWrapper icon={closeSmallIcon} width="10px" height="10px" onClick={onClick} />
    </TagItemWrapper>
  );
}
export default React.memo(TagItem);
