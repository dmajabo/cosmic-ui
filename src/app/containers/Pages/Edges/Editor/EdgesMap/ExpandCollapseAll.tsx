import IconWrapper from 'app/components/Buttons/IconWrapper';
import { arrowBottomIcon } from 'app/components/SVGIcons/arrows';
import { DEFAULT_TRANSITION } from 'lib/constants/general';
import React from 'react';
import { ISvgEdgeGroup } from './helpers';
import { ExpandCollapseAllWrapper, ExpandCollapseButton } from './styles';

enum ToogleState {
  COLLAPSE = 0,
  EXPAND = 1,
}
interface Props {
  sites: ISvgEdgeGroup[];
  apps: ISvgEdgeGroup[];
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

const ExpandCollapseAll: React.FC<Props> = (props: Props) => {
  const [showButton, setShowButton] = React.useState<boolean>(false);
  const [isExpandPossible, setIsExpandPossible] = React.useState<boolean>(false);

  React.useEffect(() => {
    if ((!props.sites || !props.sites.length) && (!props.apps || !props.apps.length)) {
      setShowButton(false);
      return;
    }
    const _sites = props.sites && props.sites.length ? checkPossibleState(props.sites) : 0;
    const _apps = props.apps && props.apps.length ? checkPossibleState(props.apps) : 0;
    setIsExpandPossible(!!Math.max(_sites, _apps));
    setShowButton(true);
  }, [props.sites, props.apps]);

  const checkPossibleState = (arr: ISvgEdgeGroup[]): ToogleState => {
    const _collpasedPresent = arr.some(it => it.collapsed);
    if (_collpasedPresent) return ToogleState.EXPAND;
    return ToogleState.COLLAPSE;
  };

  const onClick = () => {
    if (isExpandPossible) {
      props.onExpandAll();
      return;
    }
    props.onCollapseAll();
  };

  if (!showButton) return null;
  return (
    <ExpandCollapseAllWrapper>
      <ExpandCollapseButton onClick={onClick}>
        {isExpandPossible ? 'Expand all' : 'Collapse all'}
        <IconWrapper
          styles={{ margin: 'auto 0 auto 8px', transform: `${isExpandPossible ? 'rotate(0)' : 'rotate(-180deg)'}`, transition: `transform ${DEFAULT_TRANSITION}` }}
          width="12px"
          height="12px"
          icon={arrowBottomIcon}
        />
      </ExpandCollapseButton>
    </ExpandCollapseAllWrapper>
  );
};

export default React.memo(ExpandCollapseAll);
