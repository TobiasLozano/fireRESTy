import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import ProjectProvider from "./providers/context-provider.tsx";

const darkTheme = createTheme({
  typography:{
    fontFamily:'Playpen Sans'
  },
  palette: {
    mode: "dark",
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
      <ProjectProvider>

      <App />
      </ProjectProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
