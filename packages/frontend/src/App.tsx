import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PublicationTab } from "./tabs/PublicationList/PublicationList";
import { Tab, Tabs } from "@mui/material";
import { TabPanel } from "./tabs/TabPanel";
import { ThemeProvider } from "@mui/material/styles";
import { PrimaryMainTheme } from "./utils/themeOverride";

function App() {
  const [currentlySelectedTab, setCurrentlySelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentlySelectedTab(newValue);
  };

  return (
    <div className="App">
      <ThemeProvider theme={PrimaryMainTheme}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Tabs value={currentlySelectedTab} onChange={handleTabChange}>
          <Tab label="View Publications" />
        </Tabs>
        <TabPanel index={0} currentlySelectedTab={currentlySelectedTab}>
          <PublicationTab />
        </TabPanel>
      </ThemeProvider>
    </div>
  );
}

export default App;
