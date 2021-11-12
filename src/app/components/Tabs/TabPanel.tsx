import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  styles?: Object;
}

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index, styles, ...other } = props;

  return (
    <div style={styles} role="tabpanel" hidden={value !== index} id={`scrollable-auto-tabpanel-${index}`} aria-labelledby={`scrollable-auto-tab-${index}`} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
};

export default React.memo(TabPanel);
