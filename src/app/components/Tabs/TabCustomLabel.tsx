import React from 'react';

interface TabCustomLabelProps {
  children?: React.ReactNode;
  label: string;
  styles?: Object;
}

const TabCustomLabel: React.FC<TabCustomLabelProps> = (props: TabCustomLabelProps) => {
  const { children, label } = props;

  return (
    <>
      <span style={{ margin: children ? '0 12px 0 0' : '0' }}>{label}</span>
      <span>{children}</span>
    </>
  );
};

export default React.memo(TabCustomLabel);
