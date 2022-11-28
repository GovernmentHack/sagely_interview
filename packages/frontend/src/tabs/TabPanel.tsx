import * as React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  currentlySelectedTab: number;
}

/**
 * TabPanel
 * 
 * wraps the view toggling to dynamicaly display one tab and hide another
 * 
 * @param props.currentlySelectedTab - the index of the currently selected tab
 * @param props.index - the index of this tab panel
 * @returns 
 */
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