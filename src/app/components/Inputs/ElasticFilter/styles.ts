import styled from 'styled-components';

export const ElasticFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 60px;
  font-family: 'DMSans';
  font-style: normal;
  padding: 36px 30px 30px 30px;
  margin-bottom: 20px;
  background: var(--_primaryBg);
`;

export const ElasticLabel = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  color: var(--_primaryColor);
  margin-bottom: 20px;
  flex-shrink: 0;
`;

export const PopupWrapper = styled.div`
  width: 100%;
  height: 40px;
  position: relative;
  z-index: 2;
`;

export const ElasticValueWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--_primaryButtonBg);
  border: 1px solid;
  border-color: var(--_primaryButtonBorder);
  border-radius: 6px;
  padding: 8px 20px;
  cursor: pointer;
`;

export const IconsWrapper = styled.div`
  display: inline-flex;
  margin: auto 0 auto auto;
  padding: 0 0 0 12px;
  flex-shrink: 0;
`;

export const ListItemsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  padding: 6px 0;
  background: var(--_primaryButtonBg);
  box-shadow: 0px 15px 50px rgba(132, 141, 163, 0.15);
  border-radius: 6px;
  width: 100%;
  min-height: 100px;
  max-height: 340px;
  overflow-y: auto;
  overflow-x: hidden;
`;

interface ListItemProps {
  selected?: boolean;
}
export const ListItem = styled.div<ListItemProps>`
  width: 100%;
  height: 40px;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  color: var(--_primaryColor);
  background: ${props => (props.selected ? 'var(--_vmBg)' : 'var(--_primaryButtonBg)')};
  cursor: ${props => (props.selected ? 'default' : 'pointer')};
`;

export const DisplayField = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  color: var(--_primaryColor);
  flex-shrink: 0;
  display: inline-block;
  margin: auto 8px auto 0;
`;

export const SearchFieldInput = styled.input`
  height: 100%;
  flex-grow: 1;
  max-width: 100%;
  padding: 0;
  border: none;
  outline: 0;
  &:read-only {
    cursor: pointer;
  }
`;
