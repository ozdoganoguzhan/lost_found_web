import * as React from 'react';
import userLogo from '../../images/userLogo.png';
import {
  Typography, Container, Box, Link, Grid, TextField,
  CssBaseline, Button, Avatar, Checkbox, FormControlLabel, Paper, Alert, Snackbar
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useContext, useMemo, useState } from 'react';
import { IconButton } from '@mui/material';
import backButtonIcon from "../../images/left-chevron.png";
import { useTranslation } from 'react-i18next';
import IconDropdown from '../buttons/IconDropdown';
import { GetLanguages, GetLanguageKey } from '../../context/LanguageContext';
import i18next from 'i18next';
import { UserContext } from '../../context/UserContext';

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        LostFound
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultValues = {
  username: "",
  password: ""
}


const theme = createTheme();

const SignIn = (props: any) => {
  const langs = GetLanguages();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [inputValid, setInputValid] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const languageValue = useMemo(
    () => ({ selectedLanguage, setSelectedLanguage }),
    [selectedLanguage]
  )
  const languageSelectHandler = (i: number) => {
    const newLang: any = GetLanguageKey(GetLanguages()[i])
    i18next.changeLanguage(newLang);
    // navigate("?lng=" + GetLanguageKey(GetLanguages()[i]));

  }

  React.useEffect(() => {
    if (emailValid && passwordValid) setInputValid(true);
    else setInputValid(false);
  }, [emailValid, passwordValid])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let ect = event.currentTarget;

    switch (ect.name) {
      case "email":
        if (ect.value.length > 3) setEmailValid(true);
        else setEmailValid(false);
        break;
      case "password":
        if (ect.value.length > 3) setPasswordValid(true);
        else setPasswordValid(false);
        break;
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    if (email.length < 3 || password.length < 3) {
      setSnackbarOpen(true);
      return
    }

    if (validateInput()) {
      createAPIEndpoint(ENDPOINTS.users)
        .fetchByEmail(email)
        .then(res => {
          if (res.data.email == email &&
            res.data.password == password
          ) {
            setUser({
              email: res.data.email,
              username: res.data.username,
              userId: res.data.userId,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              profilePicture: res.data.profilePicture,
              emailVerified: res.data.emailVerified
            })
            navigate("/posts");
          }
          else console.log("Invalid login info!");
        })
        .catch(error => { 
          console.log(error);
          setSnackbarOpen(true);
        })
    }

  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const validateInput = () => {
    // Validate with regular expressions later
    return true
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <IconButton onClick={() => {
          navigate("/posts");
        }}>
          <Avatar src={backButtonIcon} />
        </IconButton>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Paper elevation={10} sx={{
          padding: 2,
          marginTop: 8,
          display: "flex",
          flexDirection: "column"
        }}>
          <IconDropdown
            buttonSize='small'
            dropdownIcon="language-icon.png"
            menuItems={langs}
            setMenuItemSelected={languageSelectHandler}
            sx={{ alignSelf: "end" }} />


          <Avatar sx={{ alignSelf: "center", m: 1, bgcolor: 'secondary.main' }} src={userLogo}>

          </Avatar>
          <Typography sx={{ alignSelf: "center" }} component="h1" variant="h5">
            {t("sign-in")}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("email")}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              error={!emailValid}
              helperText={!emailValid && t("field-too-short", { "minchar": "4" })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              error={!passwordValid}
              helperText={!passwordValid && t("field-too-short", { "minchar": "4" })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("remember-me", "Remember me")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!inputValid}
            >
              {t("sign-in")}
            </Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                {t("invalid-login-info")}
              </Alert>
            </Snackbar>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t("forgot-password")}
                </Link>
              </Grid>
              <Grid item>
                <Link href="../signup">
                  {t("dont-have-account")}
                </Link>
              </Grid>
            </Grid>
          </Box>

        </Paper>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;