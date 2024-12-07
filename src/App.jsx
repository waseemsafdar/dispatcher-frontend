import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import Router from './routes/Router';
import { baselightTheme } from "./theme/DefaultColors";
import { store } from './store/store';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  return (
    <Provider store={store}> {/* Wrap the application with Provider */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
