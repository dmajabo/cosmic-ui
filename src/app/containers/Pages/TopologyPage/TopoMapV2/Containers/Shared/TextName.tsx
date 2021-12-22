import React from 'react';

interface Props {
  name: string;
  x?: number | string;
  y?: number | string;
  maxTextLength?: number;
  fontSize?: number | string;
  fontWeight?: number | string;
  color?: string;
  hideTitle?: boolean;
}
const TextName: React.FC<Props> = (props: Props) => {
  const [displayedName, setDisplayedName] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!props.maxTextLength) {
      setDisplayedName(props.name);
      return;
    }
    const _dn = calculateTextWidth(props.name, props.maxTextLength);
    setDisplayedName(_dn);
  }, [props.name]);

  const calculateTextWidth = (name: string, maxTL: number) => {
    if (!name) return null;
    const _str = name.trim();
    const _max = maxTL || _str.length;
    if (_str.length <= _max) return _str;
    return _str.substr(0, _max).concat('...');
  };
  if (!displayedName) return null;
  return (
    <text x={props.x || 0} y={props.y || 0} fontSize={props.fontSize || 8} fontWeight={props.fontWeight || 500} textAnchor="middle" fill={props.color || 'var(--_primaryColor)'}>
      {displayedName}
      {!props.hideTitle && <title>{props.name}</title>}
    </text>
  );
};

export default React.memo(TextName);
