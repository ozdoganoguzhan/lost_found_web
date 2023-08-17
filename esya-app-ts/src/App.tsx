import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import Grid from '@mui/material/Grid';
import { Outlet, useLoaderData } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { styled, ThemeProvider, Typography } from '@mui/material';
import { Theme } from './Theme';
import { useTranslation } from 'react-i18next';

function App() {
  const [user, setUser] = useState(null);
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const { t } = useTranslation();


  return (
    <Grid container direction="column">

      <Grid>
        <Navbar />
        <Offset />
      </Grid>

      <Grid sx={{marginBottom: 2, minHeight: "calc(100vh - 180px)"}}>
        <Outlet />
      </Grid>

      <Grid>
        <Footer />
      </Grid>


    </Grid>

  );
}

export default App;
