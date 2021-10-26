import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  width: auto;
  margin: auto 0;
`;

interface Props {
  active: boolean;
  margin?: string;
}
export const Label = styled.span<Props>`
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  margin: ${props => props.margin || 0};
  color: ${props => (!props.active ? 'var(--_disabledTextColor)' : 'var(--_primaryColor)')};
`;

export const SwitchStylesCb = styled.input`
  display: none;
  &:checked + .switch::before {
    transform: translateX(18px);
  }
  &:checked + .switch {
    background-color: var(--_onBg);
  }
`;

export const SwitchStylesSwitch = styled.span`
  position: absolute;
  cursor: pointer;
  background-color: var(--_offBg);
  border-radius: 30px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: background-color 0.2s ease;
  &::before {
    position: absolute;
    content: '';
    left: 3px;
    top: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    transition: transform 0.3s ease;
    background: var(--_thumbBg);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const SwitchStyles = styled.label`
  position: relative;
  display: inline-block;
  width: 38px;
  height: 20px;
  flex-shrink: 0;
  overflow: hidden;
`;
