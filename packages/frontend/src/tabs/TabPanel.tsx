import * as React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  currentlySelectedTab: number;
}

export function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, currentlySelectedTab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={currentlySelectedTab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {currentlySelectedTab === index &&
        children
      }
    </div>
  );
}