# Flight Log
This project was bootstrapped with [vite](https://vite.dev/guide/):

    yarn create vite

## Updates

### Packages

Additional packages

    yarn add react-router-dom
    yarn add @mui/material @emotion/react @emotion/styled
    yarn add jotai
    yarn add gh-pages --save-dev
    
### Configuration

Add homepage to `package.json`:

```
{
    "homepage": "https://<username>.github.io/<repo-name>/"
}
```

and deploy scripts.  The `dist/404.html` is key for react router reloads.
    
```
"scripts": {
    "start": "vite",
    "build": "vite build",
    "predeploy": "yarn build && cp dist/index.html dist/404.html",
    "deploy": "gh-pages -d dist"
}
```

Set Vite base in `vite.config.js`.

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/<repo-name>/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
```

The entry point is `main.jsx`.  Ensure you have the `basename` set.

```
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

Here's a simple `app.jsx`

```
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import HomePage from "./pages/home";
import AboutPage from "./pages/about";

function App() {
  return (
    <Box>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Box>
  );
}

export default App;
```

## Develop, build, & deploy

Develop: 

    yarn start

Deploy

    yarn deploy

