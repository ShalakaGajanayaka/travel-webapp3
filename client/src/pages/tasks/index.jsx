import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskList from "./TaskList"; // Assuming the component is in components folder

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <TaskList />
  </ThemeProvider>,
  document.getElementById("root")
);
